import { Box, FormLabel, Input } from "@chakra-ui/react";
import Button from "../Button";
import React from "react";
import { MdOutlineDownload, MdOutlineUpload } from "react-icons/md";

interface ExcelUploaderUploadButtonsI {
  file_name: string;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExcelUploaderUploadButtons = ({ file_name, handleFileUpload }: ExcelUploaderUploadButtonsI) => {
  return (
    <>
      <Box display={"flex"} alignItems={`center`} flexWrap={"wrap"} columnGap={2}>
        <Input className="hidden" id="file-input" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

        <FormLabel
          htmlFor="file-input"
          className="bg-red-600 px-4 py-2 font-bold text-white transition-all hover:-translate-y-1 hover:cursor-pointer hover:bg-white hover:text-red-600"
          display={`flex`}
          alignItems={`center`}
          rounded={5}
        >
          <MdOutlineUpload size={23} />
          Wgraj plik
        </FormLabel>
        {file_name ?? <Box marginLeft={2}>{file_name}</Box>}

        <Button label="Zapisz miernik budżetowy" selected Icon={MdOutlineDownload} />
      </Box>
    </>
  );
};

export default ExcelUploaderUploadButtons;
