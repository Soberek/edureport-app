// import React from "react";
// import PizZip from "pizzip";
// import Docxtemplater from "docxtemplater";
import * as Yup from "yup";
import SitesContainer from "../../components/SiteContainer/SiteContainer";
import SiteTitle from "../../components/SiteTitle/SiteTitle";
import { Form, Formik, Field } from "formik";
import { Grid2 as Grid, Button, TextField, Autocomplete } from "@mui/material";
import { ProgramNameI } from "../../types/ProgramName";

// docx file static on client side
// every temlate different fields but shared
// izrz, lista obecnosci, rozdzielnik - generowany na tym samym template

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

export const DocumentGenerator = () => {
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

  const programNames: ProgramNameI[] = [
    {
      _id: "1",
      type: "PROGRAMOWE",
      name: "PoZ"
    }
  ];

  const checkFilePath = async (filePath: string) => {
    try {
      const response = await fetch(filePath, { method: "HEAD" });

      console.log(response);
      if (response.ok) {
        console.log("File exists at", filePath);
        return response;
      } else {
        console.log("File not found at", filePath);
        return "File not found.";
      }
    } catch (error) {
      console.log("Error checking file:", error);
    }
  };

  const handleIzrzDownload = async (_: FormDataI) => {
    const filePathCheck = checkFilePath("../../assets/templates/izrz_template.docx");

    console.log(filePathCheck);
  };

  return (
    <SitesContainer>
      <SiteTitle>DocumentGenerator</SiteTitle>

      <Formik
        initialValues={initialFormData}
        onSubmit={(_) => {
          //   handlePostMiernikItem(values);
        }}
        validationSchema={validationSchema}
      >
        {({ touched, errors, setFieldValue, values }) => (
          <Form>
            <Grid
              container
              spacing={1}
              gap={1}
              p={1}
              sx={{
                backgroundColor: "white",
                boxShadow: 10,
                borderRadius: `5px`,
                "& > div *": {
                  fontSize: 12
                },
                maxWidth: {}
              }}
            >
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="izrzTitle"
                  as={TextField}
                  label="Tytuł zadania (np. 24/87)"
                  size="small"
                  error={touched.izrzTitle && Boolean(errors.izrzTitle)}
                  helperText={touched.izrzTitle && errors.izrzTitle}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Autocomplete
                  disablePortal
                  options={programNames.map((programName) => programName.name)}
                  onChange={(_, newValue) => {
                    setFieldValue("programName", newValue); // Update the form value
                  }}
                  renderInput={(params) => (
                    <Field
                      name="programName"
                      type="string"
                      as={TextField}
                      label="Nazwa programu"
                      error={touched.programName && Boolean(errors.programName)}
                      helperText={touched.programName && errors.programName}
                      {...params}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="date"
                  as={TextField}
                  label="Data"
                  placeholder="Data wykonania zadania"
                  type="date"
                  InputLabelProps={{ shrink: true }} // Ensures the label is shrunk for date fields
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                  size="small"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="peopleCount"
                  as={TextField}
                  label="Liczba uczestników"
                  placeholder="Data wykonania zadania"
                  type="number"
                  InputLabelProps={{ shrink: true }} // Ensures the label is shrunk for date fields
                  error={touched.peopleCount && Boolean(errors.peopleCount)}
                  helperText={touched.peopleCount && errors.peopleCount}
                  size="small"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="actionName"
                  as={TextField}
                  label="Działanie np. prelekcja, wykład"
                  size="small"
                  error={touched.actionName && Boolean(errors.actionName)}
                  helperText={touched.actionName && errors.actionName}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="address"
                  as={TextField}
                  label="Adres"
                  size="small"
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="audience"
                  as={TextField}
                  label="Odbiorcy"
                  type="text"
                  size="small"
                  multiline
                  rows={5}
                  error={touched.audience && Boolean(errors.audience)}
                  helperText={touched.audience && errors.audience}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="description"
                  as={TextField}
                  label="Opis wykonanego zadania"
                  type="text"
                  multiline
                  rows={5}
                  size="small"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    console.log(errors);
                    if (Object.keys(errors).length !== 0) return;

                    handleIzrzDownload(values);
                  }}
                >
                  Wygeneruj informację z realizacji zadania - tu
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button color="primary" variant="contained" type="submit">
                  Wygeneruj liste obecności - krótka
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button color="primary" variant="contained">
                  Wygeneruj rozdzielnik
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </SitesContainer>
  );
};
