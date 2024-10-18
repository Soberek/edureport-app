import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import Button from "../../Button";
import React from "react";
import { MdOutlineDownload, MdOutlineUpload } from "react-icons/md";

interface ExcelUploaderUploadButtonsI {
  file_name: string;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveToExcelFile: () => void;
}

const ExcelUploaderUploadButtons = ({ file_name, handleFileUpload, saveToExcelFile }: ExcelUploaderUploadButtonsI) => {
  return (
    <Box display={`flex`} flexWrap={`wrap`} marginBottom={4}>
      {/* Wgraj plik */}
      <Box display={`flex`}>
        <Input sx={{ display: `none` }} id="file-input" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <FormLabel
          htmlFor="file-input"
          px={4}
          py={2}
          fontWeight={`bold`}
          bgColor={`ternary.100`}
          textColor={`white`}
          transition={"all 0.3 ease"}
          sx={{
            _hover: {
              transform: `translateY(-px)`,
              cursor: `pointer`,
              bg: "white",
              textColor: "red.600"
            }
          }}
          display={`flex`}
          alignItems={`center`}
          rounded={5}
        >
          <MdOutlineUpload size={23} />
          Wgraj miernik
        </FormLabel>
      </Box>
      {/* File name */}
      {file_name && (
        <Box display={`flex`} paddingX={4} marginRight={4} alignItems={`center`} bgColor={`white`} textColor={`black`}>
          <Text>{file_name}</Text>
        </Box>
      )}

      <Box>
        <Button label="Zapisz miernik budżetowy" selected Icon={MdOutlineDownload} onClick={saveToExcelFile} />
      </Box>
    </Box>
  );
};

export default ExcelUploaderUploadButtons;
