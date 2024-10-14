import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import Button from "../Button";
import React from "react";
import { MdOutlineDownload, MdOutlineUpload } from "react-icons/md";

interface ExcelUploaderUploadButtonsI {
  file_name: string;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExcelUploaderUploadButtons = ({ file_name, handleFileUpload }: ExcelUploaderUploadButtonsI) => {
  return (
    <Box display={`flex`} flexWrap={`wrap`} gap={4} marginBottom={4}>
      {/* Wgraj plik */}
      <Box>
        <Input className="hidden" id="file-input" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <FormLabel
          htmlFor="file-input"
          className="bg-red-600 px-4 py-2 font-bold text-white transition-all hover:-translate-y-1 hover:cursor-pointer hover:bg-white hover:text-red-600"
          display={`flex`}
          alignItems={`center`}
          rounded={5}
        >
          <MdOutlineUpload size={23} />
          Wgraj miernik
        </FormLabel>
      </Box>
      {/* File name */}
      <Box display={`flex`} alignItems={`center`}>
        {file_name ?? <Text>{file_name}</Text>}
      </Box>

      <Box>
        <Button label="Zapisz miernik budżetowy" selected Icon={MdOutlineDownload} />
      </Box>
    </Box>
  );
};

export default ExcelUploaderUploadButtons;
