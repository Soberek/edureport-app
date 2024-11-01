import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";

interface FormDataI {
  name: string;
  date: string;
  program_name: string;
  program_id: string;
  action_name: string;
  action_id: string;
  people_count: number;
  action_count: number;
}

const initial_form_data: FormDataI = {
  name: "",
  date: "",
  program_name: "",
  program_id: "",
  action_name: "",
  action_id: "",
  people_count: 0,
  action_count: 0
};

interface ProgramNameI {
  _id: string;
  name: string;
}

export interface MiernikItemI {
  _id: string;
  name: string;
  action_count: number;
  people_count: number;
  date: string;
  owner: string;
  program_id: { name: string; type: string };
  action_id: { name: string; id: string };
}

interface ActionI {
  _id: string;
  name: string;
}

const API_URL: string = import.meta.env.VITE_API_URL;

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  date: Yup.date().required("Required").min(new Date("1900-01-01"), "Przynajmniej 1900-01-01").max(new Date("2050-01-01"), "Max 2050-01-01").nullable(),
  program_name: Yup.string().required("Program name is required"),
  program_id: Yup.string().required("Program name is required"),
  action_name: Yup.string().required("Action id is required"),
  action_id: Yup.string().required("Action id is required"),
  people_count: Yup.number().min(0, "0 albo więcej").required("Pole wymagane"),
  action_count: Yup.number().min(1, "1 albo więcej").required("Pole wymagane")
});

const useMiernikAppFormik = () => {
  const token = localStorage.getItem("token");

  const [program_names, setProgramNames] = useState<ProgramNameI[]>([]);
  const [actions, setActions] = useState<ActionI[]>([]);
  const [miernik_items, setMiernikItems] = useState<MiernikItemI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMiernikItems = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/program_items`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setMiernikItems(response.data);
      }
    } catch (err) {
      console.log(err);
      setError(`Error fetching miernik items: ${err}`);
    } finally {
    }
  }, [token]);

  const handlePostMiernikItem = useCallback(
    async (values: FormDataI) => {
      console.log("Posting data...");
      try {
        const response = await axios.post(`${API_URL}/api/program_item`, values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Post response:", response.data);
        fetchMiernikItems();
      } catch (err) {
        const error = err as AxiosError;

        console.log(error);
        setError(`Error posting item: ${error.message}`);
      }
    },
    [fetchMiernikItems, token]
  );

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
      setError("Error fetching data: " + err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return { handlePostMiernikItem, initial_form_data, validationSchema, program_names, actions, miernik_items, loading, error };
};

export default useMiernikAppFormik;
