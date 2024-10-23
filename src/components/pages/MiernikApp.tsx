import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { Box, Button as MUIButton, Select, MenuItem, TextField } from "@mui/material";
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
    program_name: string;
    people_count: number;
    action_count: number;
    owner: string;
  }>({
    name: "",
    date: "",
    program_type: "",
    program_name: "",
    people_count: 0,
    action_count: 0,
    owner: ""
  });

  const [program_names, setProgramNames] = useState<ProgramNameI[]>([]);
  const [selectedProgram, setSelectedProgram] = useState("");

  const fetchProgramNames = async () => {
    try {
      const response = await axios.get("https://i-hate-my-job-backend-1.onrender.com/api/program_names", {
        withCredentials: true
      });

      console.log(response);

      if (response.status === 200) {
        const { data } = response.data as { data: ProgramNameI[] };

        setProgramNames(data);
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
      <Select
        label="Nazwa programu"
        value={selectedProgram}
        onChange={(e) => {
          setFormData({ ...formData, program_name: e.target.value });
          setSelectedProgram(e.target.value);
        }}
        variant="filled"
      >
        {program_names.map((program_name) => (
          <MenuItem key={program_name._id} value={program_name.name}>
            {program_name.name}
          </MenuItem>
        ))}
      </Select>
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
            padding: 2,
            boxShadow: 2,
            maxWidth: `400px`,
            rowGap: 2,
            flexDirection: `column`,
            display: `flex`,
            borderRadius: `10px`
          }}
        >
          <TextField label="Nazwa programu" variant="filled" name="name" value={formData.name} onChange={handleChange} />

          <TextField variant="filled" type="date" name="date" value={formData.date} onChange={handleDateChange} />

          <SelectProgramNames />

          <TextField label="Liczba działań" variant="filled" type="number" name="action_count" value={formData.action_count} onChange={handleChange} />

          <TextField label="Liczba osób" variant="filled" type="number" name="people_count" value={formData.people_count} onChange={handleChange} />

          <MUIButton variant="contained" color="primary" onClick={() => console.log(formData)}>
            Dodaj
          </MUIButton>
        </Box>
      </Form>
    </Box>
  );
};

export default MiernikApp;
