import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { fetchProgramNames } from "../../api/api";
import { ProgramNameI } from "../../types/ProgramName";

const API_URL: string = import.meta.env.VITE_API_URL;

interface FormDataI {
  actionName: string;
  programName: string;
  date: string;
  peopleCount: number;
  description: string;
  address: string;
  audience: string;
  izrzTitle: string;
}

const initialFormData: FormDataI = {
  actionName: "Prelekcja",
  programName: "",
  date: new Date().toISOString().split("T")[0],
  peopleCount: 0,
  description: "",
  address: "",
  audience: "Uczniowie kl. - \nOpiekunowie - ",
  izrzTitle: ""
};

const useIzrzGenerator = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [programNames, setProgramNames] = useState<ProgramNameI[] | []>([]);

  const validationSchema = Yup.object<FormDataI>({
    izrzTitle: Yup.string().required("Tytuł zadania jest wymagany"),
    programName: Yup.string().required("Nazwa programu jest wymagana"),
    date: Yup.date()
      .transform((value, originalValue) => {
        return originalValue ? new Date(originalValue) : value;
      })
      .required("Data jest wymagana")
      .min(new Date("1900-01-01"), "Data nie może być mniejsza niż 01.01.1900")
      .max(new Date("2050-10-10"), "Data nie może być większa niż 30.12.2050"),
    peopleCount: Yup.number().min(0, "Liczba nie może być mniejsza niż zero.").required("Liczba uczestników wymagana."),
    actionName: Yup.string().required("Nazwa działania jest wymagana"),
    address: Yup.string().required("Adres jest wymagany"),
    audience: Yup.string().required("Odbiorcy są wymagani"),
    description: Yup.string().required("Opis zadania jest wymagany")
  });

  useEffect(() => {
    const getProgramNamesFromAPI = async () => {
      const data = await fetchProgramNames();

      if (data) {
        console.log("Program names fetching success :D");
        setProgramNames(data);
      }
    };

    getProgramNamesFromAPI();
  }, []);

  const handlePostMiernikItem = useCallback(
    async (values: FormDataI) => {
      console.log("Posting data...");
      console.log(values.programName);
      setLoading(true);
      try {
        const response = await axios.post<Blob>(`${API_URL}/api/generate_izrz`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          responseType: "blob"
        });

        // define file name based on user input
        const file_name = `${values.izrzTitle}_${values.date}_${values.actionName}_${values.address}`;

        // create url for blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // create link to download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${file_name || "output"}.docx`);
        document.body.appendChild(link);
        link.click();

        // clean up and remove the link
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url); // Free up memory

        console.log("Document downloaded successfully.");
      } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        setError(`Error posting item: ${error.message}`);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { handlePostMiernikItem, validationSchema, initialFormData, loading, error, programNames };
};

export default useIzrzGenerator;
