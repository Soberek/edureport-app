import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { Box, Text } from "@chakra-ui/react";
import { ExcelUploaderMonths, Month } from "../molecules/ExcelUploaderMonths";
import ExcelUploaderTable from "./miernik_excel/ExcelUploaderTable";
import ExcelUploaderUploadButtons from "../molecules/ExcelUploaderUploadButtons";
import { Stats } from "../atoms/Stats";

import useFileReader, { ExcelRow } from "../../hooks/useFileReader";
import useFileSaver from "../../hooks/useFileSaver";

const MemoizedExcelUploaderMonths = React.memo(ExcelUploaderMonths);
const MemoizedExcelUploaderUploadButtons = React.memo(ExcelUploaderUploadButtons);
const MemoizedExcelUploaderTable = React.memo(ExcelUploaderTable);

export interface ProgramsData {
  [key: string]: {
    [key: string]: {
      [key: string]: { people: number; action_number: number };
    };
  };
}

const ExcelUploader: React.FC = () => {
  const [agregated_data, setAgregatedData] = useState<ProgramsData>({});
  const [miernik_summary, setMiernikSummary] = useState({
    actions: 0,
    people: 0
  });

  const [error, setError] = useState("");

  const [months, setMonths] = useState<Month[]>(
    useCallback((): Month[] => {
      return new Array(12).fill(0).map((_, index) => ({
        month_num: index + 1,
        selected: false
      }));
    }, [])
  );
  const { raw_data, file_name, handleFileUpload } = useFileReader();

  const { saveToExcelFile } = useFileSaver(agregated_data);

  const handleMonthSelect = useCallback((selected_month: number) => {
    setMonths((prev_months) => prev_months.map((month) => (month.month_num === selected_month ? { ...month, selected: !month.selected } : month)));
    setError("");
  }, []);

  useEffect(() => {
    if (raw_data.length > 0) {
      agregateData(raw_data, months);
    }
  }, [raw_data, months]);

  const agregateData = (data: ExcelRow[], months: Month[]) => {
    let all_people = 0;
    let all_actions = 0;

    try {
      const result = data.reduce((acc, item) => {
        const program_type = item["Typ programu"];
        const program_name = item["Nazwa programu"];
        const program_action = item["Działanie"];
        const people_count = Number(item["Liczba ludzi"]); // Convert to Number
        const action_count = Number(item["Liczba działań"]); // Convert to Number
        const date = moment(item["Data"], "YYYY-MM-DD"); // Assume date format is YYYY-MM-DD
        const month = date.month() + 1; // moment months are 0-indexed
        const selected_months = months.filter((month) => month.selected === true).map((month) => month.month_num);

        // Check for selected months
        if (selected_months.length > 0 && !selected_months.includes(month)) {
          return acc;
        }

        // Check for NaN values
        if (isNaN(people_count) || isNaN(action_count)) {
          throw new Error(`Napotkano na nieprawidłową liczbę, sprawdź swój plik excel: people_count = ${people_count}, action_count = ${action_count}`);
        }

        // Initialize nested objects if they don't exist
        if (!acc[program_type]) {
          acc[program_type] = {};
        }

        if (!acc[program_type][program_name]) {
          acc[program_type][program_name] = {};
        }

        if (!acc[program_type][program_name][program_action]) {
          acc[program_type][program_name][program_action] = { people: 0, action_number: 0 };
        }

        // Accumulate values
        acc[program_type][program_name][program_action].action_number += people_count;
        acc[program_type][program_name][program_action].people += action_count;

        all_people += people_count;
        all_actions += action_count;

        return acc;
      }, {} as ProgramsData);

      // If no errors, update state
      setMiernikSummary({
        people: all_people,
        actions: all_actions
      });

      setAgregatedData(result);

      setMiernikSummary({
        people: all_people,
        actions: all_actions
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      // You can also set an error state to display the error in the UI
      setError(errorMessage);
    }
  };

  return (
    <Box padding={4}>
      <Text marginBottom={4} display={`flex`} alignItems={`center`} gap={4} borderBottom={`2px`} pb={2} fontSize={`1.5rem`} lineHeight={`2rem`}>
        🧮 Miernik budżetowy
      </Text>

      <MemoizedExcelUploaderMonths months={months} handleMonthSelect={handleMonthSelect} />
      <MemoizedExcelUploaderUploadButtons file_name={file_name} handleFileUpload={handleFileUpload} saveToExcelFile={saveToExcelFile} />

      <Box display={`flex`} gap={2} flexWrap={`wrap`} marginBottom={{ base: 2, md: 10 }}>
        <Stats label="👩‍🏫 Ogólna liczba działań" value={miernik_summary.actions} />
        <Stats label="👨‍👩‍👧‍👦 Ogólna liczba odbiorców" value={miernik_summary.people} />
      </Box>

      {Object.keys(agregated_data).length > 0 && !error ? <MemoizedExcelUploaderTable {...agregated_data} /> : <Text>{error}</Text>}
    </Box>
  );
};

export default ExcelUploader;
