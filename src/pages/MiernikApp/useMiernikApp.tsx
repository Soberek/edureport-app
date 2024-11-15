import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { FormDataI } from "../../types/MiernikApp";
import { ProgramNameI } from "../../types/ProgramName";
import { MiernikItemI } from "../../types/MiernikItem";
import { ActionI } from "../../types/Action";

const initialFormData: FormDataI = {
  name: "",
  date: new Date().toISOString().split("T")[0],
  programName: "",
  programId: "",
  actionName: "",
  actionId: "",
  peopleCount: 0,
  actionCount: 0
};

const API_URL: string = import.meta.env.VITE_API_URL;

const validationSchema = Yup.object<FormDataI>({
  name: Yup.string().required("Required"),
  date: Yup.date()
    .required("Required")
    .min(new Date("1900-01-01"), "Przynajmniej 1900-01-01")
    .max(new Date("2050-01-01"), "Max 2050-01-01")
    .nullable(),
  programName: Yup.string().required("Nazwa programu jest wymagana."),
  programId: Yup.string().required("Program name is required"),
  actionName: Yup.string().required("Nazwa akcji jest wymagana"),
  actionId: Yup.string().required("Action id is required"),
  peopleCount: Yup.number().min(0, "0 albo więcej").required("Pole wymagane"),
  actionCount: Yup.number().min(1, "1 albo więcej").required("Pole wymagane")
});

const useMiernikAppFormik = () => {
  const token = localStorage.getItem("token");

  const [programNames, setProgramNames] = useState<ProgramNameI[]>([]);
  const [actions, setActions] = useState<ActionI[]>([]);
  const [miernikItems, setMiernikItems] = useState<MiernikItemI[]>([]);
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

  return {
    handlePostMiernikItem,
    initialFormData,
    validationSchema,
    programNames,
    actions,
    miernikItems,
    loading,
    error
  };
};

export default useMiernikAppFormik;
