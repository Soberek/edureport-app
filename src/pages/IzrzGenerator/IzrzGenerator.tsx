import React from "react";
import { Grid2 as Grid, TextField, Button, Box, Autocomplete } from "@mui/material";
import useIzrzGenerator from "./useIzrzGenerator";
import { Field, Formik, Form } from "formik";

import SitesContainer from "../../components/SiteContainer/SiteContainer";
import SiteTitle from "../../components/SiteTitle/SiteTitle";
import Templates from "./Templates";

const TaskForm: React.FC = () => {
  const { initialFormData, validationSchema, programNames, handlePostMiernikItem } = useIzrzGenerator();

  return (
    <SitesContainer>
      <SiteTitle>🧮 Generator informacji z realizacji zadania</SiteTitle>
      <Formik
        initialValues={initialFormData}
        onSubmit={(values) => {
          handlePostMiernikItem(values);
        }}
        validationSchema={validationSchema}
      >
        {({ touched, errors, setFieldValue }) => (
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
                <Button color="primary" variant="contained" type="submit">
                  Wygeneruj informację z realizacji zadania
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Box sx={{ my: 2 }}>
        <Templates />
      </Box>
    </SitesContainer>
  );
};

export default TaskForm;
