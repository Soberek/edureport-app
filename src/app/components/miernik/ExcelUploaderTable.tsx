import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { ProgramsData } from "./ExcelUploader";

const ExcelUploaderTable = (data: ProgramsData) => {
  return (
    <>
      {data &&
        Object.entries(data).map(([program_type, program_names], index) => (
          <Box key={index} marginBottom={3}>
            <Text fontSize={"1.3rem"} sx={{ fontWeight: "600" }}>
              {program_type}
            </Text>

            <Box display={"flex"} textAlign={`start`} alignItems={`center`} className="[&>div]:flex-1 [&>div]:text-xl [&>div]:font-bold" marginBottom={2}>
              <Box>Działanie</Box>
              <Box>Liczba działań</Box>
              <Box>Liczba odbiorców</Box>
            </Box>
            {Object.entries(program_names).map(([program_name, action], action_index) => (
              <Box
                key={action_index}
                border={"2px"}
                borderColor={"gray.400"}
                display={"flex"}
                flexDirection={`column`}
                textAlign={`start`}
                className="[&>div]:flex-1"
              >
                <Text>{program_name}</Text>

                <Box display={`flex`} flexDir={`column`} w={"full"} p={2}>
                  {Object.entries(action).map(([action_name, action_counters], action_index) => (
                    <Box key={action_index} display={`flex`} className="[&>div]:flex-1">
                      <Box>{action_name}</Box>

                      {Object.entries(action_counters).map(([, counter], counter_index) => (
                        <Box key={counter_index}>{counter}</Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ))}
    </>
  );
};

export default ExcelUploaderTable;
