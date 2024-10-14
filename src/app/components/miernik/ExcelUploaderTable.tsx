import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { ProgramsData } from "./ExcelUploader";

const ExcelUploaderTable = (data: ProgramsData) => {
  return (
    <>
      {data &&
        Object.entries(data).map(([program_type, program_names], index) => (
          <Box key={index}>
            <Text fontSize={"1.3rem"} sx={{ fontWeight: "600" }}>
              {program_type}
            </Text>

            <Box
              display={"flex"}
              textAlign={`start`}
              alignItems={`center`}
              className="[&>div]:flex-1 [&>div]:text-center [&>div]:text-xl [&>div]:font-bold"
              marginBottom={2}
            >
              <Box>Działanie</Box>
              <Box>Liczba działań</Box>
              <Box>Liczba odbiorców</Box>
            </Box>
            {Object.entries(program_names).map(([program_name, action], program_index) => (
              <Box
                key={program_index}
                border={"2px"}
                borderColor={"gray.400"}
                display={"flex"}
                flexDirection={`column`}
                textAlign={`start`}
                sx={{
                  "&>div": {
                    flex: 1
                  }
                }}
                marginBottom={2}
              >
                <Box paddingLeft={1} fontWeight={`bold`}>
                  {++program_index}. {program_name}
                </Box>

                <Box display={`flex`} flexDir={`column`} w={"full"}>
                  {Object.entries(action).map(([action_name, action_counters], action_index) => (
                    <Box
                      key={action_index}
                      display={`flex`}
                      className="[&>div]:flex-1"
                      sx={{
                        "&:nth-of-type(2n)": {
                          bg: "gray.400" // Apply background color to every 2nd child
                        }
                      }}
                      paddingLeft={1}
                    >
                      <Box>
                        {program_index}.{++action_index}. {action_name}
                      </Box>

                      {Object.entries(action_counters).map(([, counter], counter_index) => (
                        <Box key={counter_index} textAlign={`center`}>
                          {counter}
                        </Box>
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
