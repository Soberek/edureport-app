import React, { useState, ChangeEvent, useEffect } from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import { ExcelUploaderMonths } from "./ExcelUploaderMonths";
import Button from "../Button";
import { MdOutlineDownload, MdOutlineUpload } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";
import { Box, Text } from "@chakra-ui/react";

interface ExcelRow {
  [key: string]: string | number;
}

interface ProgramsData {
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

    const file_name = e.target.files?.[0].name;

    if (typeof file_name === "string") {
      setFileName(file_name);
    }

    console.log(file_name);
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

  console.log(Object.entries(agregated_data).map(([type, action]) => typeof action));
  return (
    <Box padding={4}>
      <h1 className="mb-4 flex items-center gap-4 border-b-2 pb-2 text-2xl">
        <SiMicrosoftexcel />
        Miernik budżetowy
      </h1>

      <ExcelUploaderMonths getSelectedMonths={getSelectedMonths} />
      <Box display={"flex"} flexWrap={"wrap"} gap={2}>
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

      {agregated_data &&
        Object.entries(agregated_data).map(([program_type, program_names], index) => (
          <Box key={index} marginBottom={3}>
            <Text fontSize={"1.3rem"} sx={{ fontWeight: "600" }}>
              {program_type}
            </Text>

            <Box display={"flex"} textAlign={`center`} alignItems={`center`} className="[&>div]:flex-1 [&>div]:text-xl [&>div]:font-bold" marginBottom={2}>
              <Box>Działanie</Box>
              <Box>Liczba działań</Box>
              <Box>Liczba odbiorców</Box>
            </Box>
            {Object.entries(program_names).map(([program_name, action], action_index) => (
              <Box
                key={action_index}
                borderBottom={"2px"}
                borderColor={"gray.400"}
                display={"flex"}
                flexDirection={`column`}
                textAlign={`start`}
                alignItems={`center`}
                className="[&>div]:flex-1"
                marginBottom={2}
              >
                <Text>{program_name}</Text>

                <Box display={`flex`} flexDir={`column`} w={"full"} p={2}>
                  {Object.entries(action).map(([action_name, action_counters], action_index) => (
                    <Box key={action_index} display={`flex`} p={2} className="[&>div]:flex-1 [&>div]:p-1">
                      <Box>{action_name}</Box>
                      <Box>{1}</Box>
                      <Box>{1}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ))}

      <pre className="mb-4 border p-2">
        {agregated_data &&
          Object.keys(agregated_data).map((program_type, program_type_index) => (
            <div key={program_type_index} className="mb-2 border p-2">
              <h1 className="mb-3 border-b-2 text-lg">
                {++program_type_index}. {program_type}
              </h1>

              <div>
                {Object.keys(agregated_data[program_type]).map((program_name, program_name_index) => (
                  <div key={program_name} className="">
                    <span className="font-bold">{`${++program_name_index}.\t${program_name}\n`}</span>
                    {Object.keys(agregated_data[program_type][program_name]).map((program_action, program_action_idx) => (
                      <div key={program_action_idx} className="flex [&>*]:flex-1">
                        {program_name_index}.{++program_action_idx}.{"\t"}
                        <span>{program_action}</span>
                        {Object.values(agregated_data[program_type][program_name][program_action]).map((counter, counter_index) => (
                          <span key={counter_index} className="ml-4">
                            {`\t`}
                            {counter}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </pre>
    </Box>
  );
};

export default ExcelUploader;
