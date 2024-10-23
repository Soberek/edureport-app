import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { Box, Button as MUIButton, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import moment from "moment";

interface ProgramNameI {
  _id: string;
  name: string;
}

const MiernikApp = () => {
  const [formData, setFormData] = useState<{
    name: string;
    date: string;
    program_type: "PROGRAMOWE" | "NIEPROGRAMOWE" | "";
    program_names: ProgramNameI[];
    people_count: number;
    action_count: number;
    owner: string;
  }>({
    name: "",
    date: "",
    program_type: "",
    program_names: [],
    people_count: 0,
    action_count: 0,
    owner: ""
  });

  const fetchProgramNames = async () => {
    try {
      const response = await axios.get("https://i-hate-my-job-backend-1.onrender.com/api/program_names", {
        withCredentials: true
      });

      console.log(response);

      if (response.status === 200) {
        const { data } = response.data as { data: ProgramNameI[] };

        setFormData((prevFormData) => {
          return { ...prevFormData, program_names: data };
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProgramNames();
  }, []);

  const SelectProgramNames = () => {
    return (
      <FormControl fullWidth>
        <InputLabel id="program-name-label">Wybierz program</InputLabel>
        <Select
          labelId="program-name-label"
          value={formData.program_names.length > 0 ? formData.program_names[0].name : ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        >
          {formData.program_names.map((program_name) => (
            <MenuItem key={program_name._id} value={program_name.name}>
              {program_name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setFormData({ ...formData, [e.target.name]: newDate });
    console.log(newDate); // value picked from date picker
  };

  return (
    <Box p={4}>
      <Form>
        <Box
          sx={{
            backGroundColor: "white",
            padding: 4,
            boxShadow: 2,
            maxWidth: `400px`,
            rowGap: 4,
            flexDirection: `column`,
            display: `flex`,
            borderRadius: `10px`
          }}
        >
          <FormControl fullWidth>
            <InputLabel htmlFor="program_name">Nazwa programu</InputLabel>
            <TextField variant="outlined" id="program_name" name="name" value={formData.name} onChange={handleChange} placeholder="Nazwa programu" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="program_date">Data</InputLabel>
            <TextField
              variant="outlined"
              id="program_date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>

          <SelectProgramNames />
          <MUIButton variant="contained" color="primary" onClick={() => console.log(formData)}>
            Dodaj
          </MUIButton>
        </Box>
      </Form>
    </Box>
  );
};

export default MiernikApp;
