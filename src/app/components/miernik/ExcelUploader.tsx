import React, { useState, ChangeEvent, useEffect } from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import Button from "../Button";
import { MdOutlineDownload, MdOutlineUpload } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";
import { Box } from "@chakra-ui/react";
import { ExcelUploaderMonths } from "./ExcelUploaderMonths";
import ExcelUploaderTable from "./ExcelUploaderTable";

interface ExcelRow {
  [key: string]: string | number;
}

export interface ProgramsData {
  [key: string]: {
    [key: string]: {
      [key: string]: { people: number; action_number: number };
    };
  };
}

const ExcelUploader: React.FC = () => {
  const [agregated_data, setAgregatedData] = useState<ProgramsData>({});
  const [raw_data, setRawData] = useState<ExcelRow[]>([]);
  const [selected_months, setSelectedMonths] = useState<number[]>([]);
  const [file_name, setFileName] = useState("");
  const [miernik_summary, setMiernikSummary] = useState({
    actions: 0,
    people: 0
  });

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const blob_xlsx_file = e.target.files?.[0];

    const isXlsx = blob_xlsx_file?.name.endsWith(".xlsx");
    const isXls = blob_xlsx_file?.name.endsWith(".xls");

    if (!isXls && !isXlsx) return;

    const file_name = e.target.files?.[0].name;

    if (typeof file_name === "string") {
      setFileName(file_name);
    }

    if (!blob_xlsx_file) return;

    const reader = new FileReader();

    reader.onloadstart = () => {
      console.log("Loading file start....");
    };

    reader.onloadend = () => {
      console.log("Loading file end...");
    };

    reader.onload = (evt: ProgressEvent<FileReader>) => {
      const array_buffer = evt.target?.result;

      if (!array_buffer) {
        console.error("Failed to load the file. The file data is missing.");
        return;
      }

      try {
        const wb = XLSX.read(array_buffer, { type: "array" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { raw: false }) as ExcelRow[];

        setRawData(data);
      } catch (error) {
        console.error("Error reading XLSX file:", error);
      }
    };

    reader.readAsArrayBuffer(blob_xlsx_file);
  };

  const getSelectedMonths = (selected_months: number[]) => {
    setSelectedMonths(selected_months);
  };

  const agregateData = (data: ExcelRow[]) => {
    let all_people = 0;
    let all_actions = 0;

    const result = data.reduce((acc, item) => {
      const program_type = item["Typ programu"];
      const program_name = item["Nazwa programu"];
      const program_action = item["Działanie"];
      const people_count = Number(item["Liczba ludzi"]);
      const action_count = Number(item["Liczba działań"]);
      const date = moment(item["Data"], "YYYY-MM-DD"); // Assume date format is YYYY-MM-DD
      const month = date.month() + 1; // moment months are 0-indexed

      if (selected_months.length > 0 && !selected_months.includes(month)) {
        return acc;
      }

      if (!acc[program_type]) {
        acc[program_type] = {};
      }

      if (!acc[program_type][program_name]) {
        acc[program_type][program_name] = {};
      }

      if (!acc[program_type][program_name][program_action]) {
        acc[program_type][program_name][program_action] = { people: 0, action_number: 0 };
      }

      acc[program_type][program_name][program_action].action_number += people_count;
      acc[program_type][program_name][program_action].people += action_count;

      all_people += people_count;
      all_actions += action_count;

      return acc;
    }, {} as ProgramsData);

    setMiernikSummary({
      people: all_people,
      actions: all_actions
    });

    setAgregatedData(result);
  };

  useEffect(() => {
    if (raw_data.length > 0) {
      agregateData(raw_data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw_data, selected_months]);

  return (
    <Box padding={4}>
      <h1 className="mb-4 flex items-center gap-4 border-b-2 pb-2 text-2xl">
        <SiMicrosoftexcel />
        Miernik budżetowy
      </h1>

      <ExcelUploaderMonths getSelectedMonths={getSelectedMonths} />
      <Box display={"flex"} flexWrap={"wrap"} gap={2} marginBottom={2}>
        <input className="hidden" id="file-input" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

        <label
          htmlFor="file-input"
          className="flex items-center gap-2 bg-red-600 px-4 py-2 font-bold text-white transition-all hover:-translate-y-1 hover:cursor-pointer hover:bg-white hover:text-red-600"
        >
          <MdOutlineUpload size={23} />
          Wgraj plik
        </label>
        {file_name ?? <div className="ml-2">{file_name}</div>}

        <Button label="Zapisz miernik budżetowy" selected Icon={MdOutlineDownload} />
      </Box>

      <div className="mb-4 flex flex-col">
        <span>Ogólna liczba odbiorców: {miernik_summary.people}</span>
        <span>Ogólna liczba działań: {miernik_summary.actions}</span>
      </div>

      {Object.keys(agregated_data).length > 0 && <ExcelUploaderTable {...agregated_data} />}
    </Box>
  );
};

export default ExcelUploader;