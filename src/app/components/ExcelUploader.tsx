import React, { useState, ChangeEvent } from "react";
import * as XLSX from "XLSX";
import moment from "moment";

interface ExcelRow {
  [key: string]: string | number;
}

const ExcelUploader: React.FC = () => {
  const [data, setData] = useState<ExcelRow[]>([]);
  const [monthInput, setMonthInput] = useState<number | null>(null);
  const [months, setMonths] = useState<number[]>([]);

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

        console.log(data);
        setData(data);
      }
    };

    reader.readAsArrayBuffer(blob_xlsx_file);
  };

  function handleMonthsChange(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (monthInput)
      setMonths((prevMonths) => {
        const find = prevMonths.find((el) => el === monthInput);
        if (find) return prevMonths;
        return [...prevMonths, monthInput];
      });
    console.log(months);
  }

  function handleMonthsInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);

    if (!isNaN(value)) {
      setMonthInput(value);
    }
  }

  function agregateData(
    data: {
      [key: string]: string | number;
      ["Typ działania"]: string;
      ["Liczba ludzi"]: number;
      ["Liczba działań"]: number;
    }[]
  ) {
    const agregated_data: {
      [key: string]: {
        [key: string]: { people: number; action_number: number };
      };
    } = {};

    data.forEach((row) => {
      const program_type = row["Typ programu"];
      const program_name = row["Nazwa programu"];
      const people_count = Number(row["Liczba ludzi"]);
      const action_count = Number(row["Liczba działań"]);

      const date = moment(row["Data"], "YYYY-MM-DD"); // Assume date format is YYYY-MM-DD
      const month = date.month() + 1; // moment months are 0-indexed

      console.log(date);

      //   tworzy typy programów
      if (!agregated_data[program_type]) {
        agregated_data[program_type] = {};
      }
      //   tworzy nazwy programów
      if (!agregated_data[program_type][program_name]) {
        agregated_data[program_type][program_name] = {
          people: 0,
          action_number: 0
        };
      }

      if (!isNaN(people_count) && !isNaN(action_count))
        agregated_data[program_type][program_name].people += people_count;
      agregated_data[program_type][program_name].action_number += action_count;
    });

    console.log(agregated_data);
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl">Miernik budżetowy</h1>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleMonthsChange} className="flex flex-row gap-4">
          <label className="font-bold py-1 px-2">Miesiące</label>
          <input
            type="number"
            className="w-52 py-1 px-2 text-black"
            placeholder="Podaj miesiąc"
            onChange={handleMonthsInput}
            value={monthInput || 0}
            max={12}
            min={1}
            required
          />
          <button
            type="submit"
            className="px-4 py-1 rounded-full bg-red-600 font-bold hover:bg-red-400 hover:-translate-y-1 transition-all"
          >
            Dodaj
          </button>
        </form>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      </div>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value.toString()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelUploader;
