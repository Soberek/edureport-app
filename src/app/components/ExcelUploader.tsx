import React, { useState, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import { ExcelUploaderMonths } from "./ExcelUploaderMonths";

interface ExcelRow {
  [key: string]: string | number;
}

// interface Data {
//   [key: string]: {
//     [key: string]: {
//       [key: string]: { people: number; action_number: number };
//     };
//   };
// }

interface ProgramsData {
  [key: string]: {
    [key: string]: {
      [key: string]: { people: number; action_number: number };
    };
  };
}

const ExcelUploader: React.FC = () => {
  const [agregated_data, setAgregatedData] = useState<ProgramsData>({});

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const blob_xlsx_file = e.target.files?.[0];
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

      if (array_buffer instanceof ArrayBuffer) {
        const wb = XLSX.read(array_buffer, { type: "array" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { raw: false }) as ExcelRow[];

        agregateData(data);
      }
    };

    reader.readAsArrayBuffer(blob_xlsx_file);
  };

  const agregateData = (data: ExcelRow[]) => {
    const programs_data: ProgramsData = {};

    data.forEach((row) => {
      const program_type = row["Typ programu"];
      const program_name = row["Nazwa programu"];
      const program_action = row["Działanie"];
      const people_count = Number(row["Liczba ludzi"]);
      const action_count = Number(row["Liczba działań"]);
      const date = moment(row["Data"], "YYYY-MM-DD"); // Assume date format is YYYY-MM-DD
      const month = date.month() + 1; // moment months are 0-indexed

      console.log(month);

      //   tworzy typy programów
      if (!programs_data[program_type]) {
        programs_data[program_type] = {};
      }
      //   tworzy nazwy programów
      if (!programs_data[program_type][program_name]) {
        programs_data[program_type][program_name] = {};
      }

      // tworzy nazwy typów akcji
      if (!programs_data[program_type][program_name][program_action]) {
        programs_data[program_type][program_name][program_action] = {
          people: 0,
          action_number: 0
        };
      }

      if (!isNaN(people_count) && !isNaN(action_count)) {
        programs_data[program_type][program_name][program_action].people += people_count;
        programs_data[program_type][program_name][program_action].action_number += action_count;
      }
    });

    setAgregatedData(programs_data);
  };
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl">Miernik budżetowy</h1>

      <ExcelUploaderMonths />

      <div className="mb-4 border">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      </div>

      <pre className="mb-4 border">
        {agregated_data &&
          Object.keys(agregated_data).map((program_type, program_type_index) => (
            <div key={program_type_index} className="mb-4">
              <h1 className="mb-3 border-b-2 text-lg">
                {++program_type_index}. {program_type}
              </h1>

              <div>
                {Object.keys(agregated_data[program_type]).map((program_name, program_name_index) => (
                  <div key={program_name} className="mb-2">
                    <h1 className="font-bold">{`${++program_name_index}.\t${program_name}\n`}</h1>
                    {Object.keys(agregated_data[program_type][program_name]).map((program_action, program_action_idx) => (
                      <div key={program_action_idx} className="">
                        <>
                          <span>
                            {program_name_index}.{++program_action_idx}.{"\t"}
                          </span>
                          <span>{program_action}</span>

                          {"\t"}
                        </>
                        {Object.values(agregated_data[program_type][program_name][program_action]).map((counter) => (
                          <>
                            <span className="ml-4">
                              {`\t`}
                              {counter}
                            </span>
                          </>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </pre>
    </div>
  );
};

export default ExcelUploader;
