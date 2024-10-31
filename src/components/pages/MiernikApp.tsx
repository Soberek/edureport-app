import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Button as MUIButton, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import moment from "moment";
import { SelectDropdown } from "../atoms/Select";
import { BasicTable } from "../organism/MiernikAppTable";

interface ProgramNameI {
  _id: string;
  name: string;
}

const API_URL: string = import.meta.env.VITE_API_URL;

export interface MiernikItemI {
  name: string;
  action_count: number;
  people_count: number;
  date: string;
  owner: string;
  program_id: { name: string; type: string };
  action_id: { name: string; id: string };
}

interface FormDataI {
  name: string;
  date: string;
  program: {
    name: string;
    id: string;
  };
  action: {
    name: string;
    id: string;
  };
  people_count: number;
  action_count: number;
}

const initial_form_data = {
  name: "",
  date: "",
  program: {
    name: "",
    id: ""
  },
  action: {
    name: "",
    id: ""
  },
  people_count: 0,
  action_count: 0
};

const MiernikApp = () => {
  const [formData, setFormData] = useState<FormDataI>(initial_form_data);

  const [errors, setErrors] = useState<{
    name: string;
    date: string;
    program_name: string;
    people_count: string;
    action_count: string;
  }>({
    name: "",
    date: "",
    program_name: "",
    people_count: "",
    action_count: ""
  });

  const token = localStorage.getItem("token");

  interface ActionI {
    _id: string;
    name: string;
  }

  const [program_names, setProgramNames] = useState<ProgramNameI[]>([]);

  const [miernik_items, setMiernikItems] = useState<MiernikItemI[] | []>([]);

  const [actions, setActions] = useState<ActionI[] | []>([]);

  const handleSelectChange = useCallback(
    <T extends { _id: string; name: string }>(e: React.ChangeEvent<HTMLInputElement>, elements: T[], key_to_access_form_data_value: string) => {
      const id = e.target.value;
      const position = elements.find((element) => element._id === id);

      if (position) {
        setFormData((prevFormData) => {
          return { ...prevFormData, [key_to_access_form_data_value]: { name: position.name, id: position._id } };
        });
      }
    },
    []
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  }, []);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: newDate };
    });
  }, []);

  const fetchMiernikItems = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/program_items`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = response.data;

        setMiernikItems(data);
      }
    } catch (err) {
      console.error(`Error on fetching miernik items`, err);
    }
  }, [token]);

  const handlePostMiernikItem = useCallback(async () => {
    const validateForm = () => {
      let valid = true;
      const newErrors = {
        name: "",
        date: "",
        program_type: "",
        program_name: "",
        people_count: "",
        action_count: "",
        action_id: ""
      };

      if (!formData.name) {
        newErrors.name = "Nazwa programu nie może być pusta";
        valid = false;
      }

      if (!formData.date) {
        newErrors.date = "Data nie może być pusta";
        valid = false;
      }

      if (!formData.program.name || !formData.program.id) {
        newErrors.program_name = "Wybierz nazwę programu";
        valid = false;
      }

      if (formData.people_count <= 0) {
        newErrors.people_count = "Liczba osób musi być większa od 0";
        valid = false;
      }

      if (formData.action_count <= 0) {
        newErrors.action_count = "Liczba działań musi być większa od 0";
        valid = false;
      }

      if (!formData.action.id || !formData.action.name) {
        newErrors.action_id = "Wybierz działanie";
        valid = false;
      }

      setErrors(newErrors);
      return valid;
    };

    const is_valid = validateForm();

    if (!is_valid) {
      console.log("Formularz zawiera błędy:", errors);
      return;
    }

    const new_miernik_item = {
      ...formData
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/program_item`,
        {
          new_miernik_item
        },
        {
          // withCredentials: true
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      fetchMiernikItems();
    }
  }, [errors, fetchMiernikItems, formData, token]);

  const fetchData = useCallback(async () => {
    try {
      const [programNamesResponse, actionsResponse, miernikItemsResponse] = await Promise.allSettled([
        axios.get(`${API_URL}/api/program_names`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/api/program_actions`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/api/program_items`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (programNamesResponse.status === "fulfilled") setProgramNames(programNamesResponse.value.data);
      if (actionsResponse.status === "fulfilled") setActions(actionsResponse.value.data);
      if (miernikItemsResponse.status === "fulfilled") setMiernikItems(miernikItemsResponse.value.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box p={{ xs: 1, md: 4 }}>
      <Grid
        sx={{
          backgroundColor: "white",
          p: 2,
          boxShadow: 2,
          "&>*>*": {
            boxSizing: "border-box",
            p: 1,
            width: `100%`
          },
          rowGap: 1,
          borderRadius: `5px`
        }}
        container
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Nazwa" required variant="filled" name="name" value={formData.name} onChange={handleChange} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField variant="filled" required type="date" name="date" value={formData.date} onChange={handleDateChange} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {program_names.length > 0 && (
            <SelectDropdown
              label="Nazwa programu"
              value={formData.program.id}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectChange(event, program_names, "program")}
              options={program_names}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {actions.length > 0 && (
            <SelectDropdown
              label="Działanie"
              value={formData.action.id}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectChange(event, actions, "action")}
              options={actions}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Liczba działań" required variant="filled" type="number" name="action_count" value={formData.action_count} onChange={handleChange} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label="Liczba osób" required variant="filled" type="number" name="people_count" value={formData.people_count} onChange={handleChange} />
        </Grid>

        <Box sx={{ width: "100%", display: "flex", p: 1, alignItems: "center" }}>
          <MUIButton sx={{ maxWidth: `150px` }} variant="contained" color="primary" onClick={handlePostMiernikItem}>
            Dodaj
          </MUIButton>
        </Box>
      </Grid>

      <Box mt={4}>{miernik_items.length > 0 && <BasicTable data={miernik_items} />}</Box>
    </Box>
  );
};

export default MiernikApp;
