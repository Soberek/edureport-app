import { Box, Typography } from "@mui/material";

import { ProgramsData } from "../pages/ExcelUploader";

const TableHeader = () => {
  return (
    <Box display={"flex"} textAlign={`start`} alignItems={`center`} marginBottom={2}>
      <Box flex={1} textAlign="center" fontWeight="bold" fontSize="1.2rem">
        Działanie
      </Box>
      <Box flex={1} textAlign="center" fontWeight="bold" fontSize="1.2rem">
        Liczba działań
      </Box>
      <Box flex={1} textAlign="center" fontWeight="bold" fontSize="1.2rem">
        Liczba odbiorców
      </Box>
    </Box>
  );
};

const ExcelUploaderTable = (data: ProgramsData) => {
  return (
    <>
      {data &&
        Object.entries(data).map(([program_type, program_names], index) => (
          <Box key={index} marginBottom={2}>
            <Typography variant="h6" fontWeight={600}>
              {program_type}
            </Typography>
            <TableHeader />
            {Object.entries(program_names).map(([program_name, action], program_index) => (
              <Box key={program_index} border={2} borderColor="gray.400" display="flex" flexDirection="column" textAlign="start" marginBottom={2}>
                <Box paddingLeft={1} fontWeight="bold">
                  {++program_index}. {program_name}
                </Box>

                <Box display="flex" flexDirection="column" width="100%">
                  {Object.entries(action).map(([action_name, action_counters], action_index) => (
                    <Box key={action_index} display="flex" paddingLeft={1}>
                      <Box display="flex" flex={1}>
                        {program_index}.{++action_index}. {action_name}
                      </Box>

                      {Object.entries(action_counters).map(([, counter], counter_index) => (
                        <Box key={counter_index} flex={1} textAlign="center">
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
