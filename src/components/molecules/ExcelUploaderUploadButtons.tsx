import React from "react";
import { Box, FormLabel, Input, Typography } from "@mui/material";
import { MdOutlineDownload, MdOutlineUpload } from "react-icons/md";

interface ButtonProps {
  label: string;
  selected?: boolean;
  Icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
}

// Custom Button component since the original import isn't available
const Button: React.FC<ButtonProps> = ({ label, selected, Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded font-bold transition-all duration-300 ${
        selected ? "bg-blue-600 text-white hover:bg-white hover:text-red-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {Icon && <Icon size={23} />}
      {label}
    </button>
  );
};

interface ExcelUploaderUploadButtonsProps {
  file_name: string;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveToExcelFile: () => void;
}

const ExcelUploaderUploadButtons: React.FC<ExcelUploaderUploadButtonsProps> = ({ file_name, handleFileUpload, saveToExcelFile }) => {
  const [hoverUpload, setHoverUpload] = React.useState(false);

  return (
    <Box className="flex flex-wrap mb-8 gap-4">
      {/* Upload File */}
      <Box className="flex">
        <Input className="hidden" id="file-input" type="file" onChange={handleFileUpload} />
        <FormLabel
          htmlFor="file-input"
          className={`
            flex items-center px-4 py-2 font-bold rounded cursor-pointer transition-all duration-300
            ${hoverUpload ? "bg-white text-red-500" : "bg-blue-500 text-white"}
          `}
          onMouseEnter={() => setHoverUpload(true)}
          onMouseLeave={() => setHoverUpload(false)}
        >
          <MdOutlineUpload size={23} className="mr-2" />
          Wgraj miernik
        </FormLabel>
      </Box>

      {/* File name display */}
      {file_name && (
        <Box className="flex px-4 mr-4 items-center bg-white text-black rounded border border-gray-300">
          <Typography>{file_name}</Typography>
        </Box>
      )}

      <Box>
        <Button label="Zapisz miernik budżetowy" selected Icon={MdOutlineDownload} onClick={saveToExcelFile} />
      </Box>
    </Box>
  );
};

export default ExcelUploaderUploadButtons;
