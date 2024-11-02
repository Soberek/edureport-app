import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { MdOutlineDownload, MdOutlineUpload } from "react-icons/md";

interface ExcelUploaderUploadButtonsProps {
  file_name: string;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveToExcelFile: () => void;
}

const ExcelUploaderUploadButtons: React.FC<ExcelUploaderUploadButtonsProps> = ({ file_name, handleFileUpload, saveToExcelFile }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", mb: 2, gap: 2 }}>
      <Box sx={{ display: "flex", gap: 4, mb: 1 }}>
        <Button startIcon={<MdOutlineUpload />} variant="contained" component="label">
          Wgraj plik excel
          <input type="file" accept=".xlsx, .xls" hidden onChange={handleFileUpload} />
        </Button>
        <Button startIcon={<MdOutlineDownload />} variant="contained" onClick={saveToExcelFile}>
          Zapisz miernik
        </Button>
      </Box>

      {/* File name display */}
      {file_name && (
        <Box className="">
          <Typography>{file_name}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ExcelUploaderUploadButtons;