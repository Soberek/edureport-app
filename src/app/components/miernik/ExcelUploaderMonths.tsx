import React, { useState, useEffect } from "react";
import Button from "../Button";

import { Box, Text } from "@chakra-ui/react";

interface Month {
  month_num: number;
  selected: boolean;
}

export const ExcelUploaderMonths = ({ getSelectedMonths }: { getSelectedMonths: (selected_months: number[]) => void }) => {
  const [months, setMonths] = useState<Month[]>([]);

  useEffect(() => {
    const fillMonths = (): Month[] => {
      return new Array(12).fill(0).map((_, index) => ({
        month_num: index + 1,
        selected: false
      }));
    };

    setMonths(fillMonths());
  }, []);

  const handleMonthSelect = (month_to_select: number) => {
    setMonths((prev_months) => {
      const updated_months = prev_months.map((month) => (month_to_select === month.month_num ? { ...month, selected: !month.selected } : month));

      // Extract selected months after the update
      const selected_months = updated_months.filter((month) => month.selected).map((month) => month.month_num);

      // Call the parent function with the selected months
      console.log(selected_months);

      getSelectedMonths(selected_months);

      return updated_months; // Return the updated state
    });
  };

  return (
    <>
      <Text marginBottom={2} fontWeight={700} fontSize={20}>
        🦄 Miesiące:
      </Text>
      <Box className="justify-left mb-4 flex flex-row flex-wrap gap-4">
        {months.length > 0 &&
          months.map(({ month_num, selected }, index) => (
            <Button key={index} selected={selected} label={month_num} onClick={() => handleMonthSelect(month_num)} />
          ))}
      </Box>
    </>
  );
};
