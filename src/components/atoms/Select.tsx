import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface Option {
  _id: string;
  name: string;
}

interface SelectDropdownProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: Option[];
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({ label, value, onChange, options }) => {
  return (
    <TextField select label={label} value={value} onChange={onChange} variant="filled" required>
      {options.length > 0 &&
        options.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.name}
          </MenuItem>
        ))}
    </TextField>
  );
};
