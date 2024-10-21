import Button from "../atoms/Button";

import { Box, Text } from "@chakra-ui/react";

export interface Month {
  month_num: number;
  selected: boolean;
}

export const ExcelUploaderMonths = ({ months, handleMonthSelect }: { months: Month[]; handleMonthSelect: (selected_month: number) => void }) => {
  return (
    <>
      <Text marginBottom={2} fontWeight={700} fontSize={20}>
        🦄 Miesiące:
      </Text>
      <Box justifyContent={`left`} mb={4} display={`flex`} flexDir={`row`} flexWrap={`wrap`} gap={4}>
        {months.length > 0 &&
          months.map(({ month_num, selected }, index) => (
            <Button key={index} selected={selected} label={month_num} onClick={() => handleMonthSelect(month_num)} />
          ))}
      </Box>
    </>
  );
};