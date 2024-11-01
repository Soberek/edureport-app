import React from "react";
import { Grid2 as Grid, TextField, Button, Box } from "@mui/material";
import useTaskFormik from "../../hooks/useIzrzGenerator";
import { Field, Formik, Form } from "formik";

const TaskForm: React.FC = () => {
  const { initial_form_data, validationSchema, handlePostMiernikItem } = useTaskFormik();

  return (
    <Box p={{ xs: 1, md: 4 }}>
      <Formik
        initialValues={initial_form_data}
        onSubmit={(values) => {
          console.log(values);
          handlePostMiernikItem(values);
        }}
        validationSchema={validationSchema}
      >
        {({ touched, errors }) => (
          <Form>
            <Grid
              container
              spacing={2}
              gap={1}
              p={2}
              sx={{
                backgroundColor: "white",
                boxShadow: 10,
                borderRadius: `5px`
              }}
            >
              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="izrz_title"
                  as={TextField}
                  label="Tytuł zadania (np. 24/87)"
                  size="small"
                  error={touched.izrz_title && Boolean(errors.izrz_title)}
                  helperText={touched.izrz_title && errors.izrz_title}
                  margin="normal"
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
                  margin="normal"
                  size="small"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="action_name"
                  as={TextField}
                  label="Działanie np. prelekcja, wykład"
                  size="small"
                  error={touched.action_name && Boolean(errors.action_name)}
                  helperText={touched.action_name && errors.action_name}
                  margin="normal"
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
                  margin="normal"
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
                  rows={3}
                  error={touched.audience && Boolean(errors.audience)}
                  helperText={touched.audience && errors.audience}
                  margin="normal"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Field
                  name="description"
                  as={TextField}
                  label="Opis wykonanego zadania"
                  type="text"
                  multiline
                  rows={3}
                  size="small"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  margin="normal"
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
    </Box>
  );
};

export default TaskForm;
