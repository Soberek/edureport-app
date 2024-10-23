import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { MdOutlineDownload, MdOutlineUpload } from "react-icons/md";

// // Custom Button component since the original import isn't available
// const Button: React.FC<ButtonProps> = ({ label, selected, Icon, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center px-4 py-2 rounded font-bold transition-all duration-300 ${
//         selected ? "bg-blue-600 text-white hover:bg-white hover:text-red-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//       }`}
//     >
//       {Icon && <Icon size={23} />}
//       {label}
//     </button>
//   );
// };

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
          <input type="file" hidden onChange={handleFileUpload} />
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
