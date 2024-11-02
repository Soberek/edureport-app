import { Box, Button, MenuItem, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MiernikAppTable } from "../organism/MiernikAppTable";
import useMiernikAppFormik from "../../hooks/useMiernikApp";
import SitesContainer from "../atoms/SiteContainer";
import SiteTitle from "../atoms/SiteTitle";

const MiernikApp = () => {
  const { handlePostMiernikItem, initial_form_data, validationSchema, miernik_items, actions, program_names, loading } = useMiernikAppFormik();

  if (loading === true) return <div style={{ padding: 10 }}>Loading... (best UI experience)</div>;

  return (
    <SitesContainer>
      <SiteTitle>🧮 Miernik Budżetowy (wersja mongodb)</SiteTitle>
      <Box>
        <Formik
          initialValues={initial_form_data}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handlePostMiernikItem(values);
          }}
        >
          {({ setFieldValue, touched, errors, values }) => (
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
                  maxWidth: {
                    md: 600
                  }
                }}
              >
                <Grid
                  size={{ xs: 12, sm: 6 }}
                  sx={{
                    "& *": {
                      fontSize: 12
                    }
                  }}
                >
                  <Field
                    as={TextField}
                    fullWidth
                    name="name"
                    label="Nazwa np. 88/24 - SP3 w Myśliborzu"
                    error={touched.name && Boolean(errors.name)}
                    helperText={<ErrorMessage name="name" />}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="date"
                    label="Data wykonania zadania"
                    type="date"
                    error={touched.date && Boolean(errors.date)}
                    helperText={<ErrorMessage name="date" />}
                    slotProps={{
                      inputLabel: {
                        shrink: true
                      }
                    }}
                    size="small"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="people_count"
                    label="People Count"
                    type="number"
                    error={touched.people_count && values.people_count < 0}
                    helperText={<ErrorMessage name="people_count" />}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="action_count"
                    label="Action Count"
                    type="number"
                    error={touched.action_count && values.action_count < 0}
                    helperText={<ErrorMessage name="action_count" />}
                    size="small"
                  />
                </Grid>

                {/* Program name */}
                {program_names.length > 0 && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      label="Nazwa programu"
                      name="program_name"
                      error={touched.program_name && Boolean(errors.program_name)}
                      helperText={<ErrorMessage name="program_name" />}
                      onChange={(e: { target: { value: any } }) => {
                        const selected_program_name = e.target.value;
                        const selected_program = program_names.find((program) => program.name === selected_program_name);
                        setFieldValue("program_name", selected_program_name);
                        setFieldValue("program_id", selected_program ? selected_program._id : ""); // Set the corresponding ID
                      }}
                      // size="small"
                    >
                      {program_names.map((program) => (
                        <MenuItem key={program._id} value={program.name}>
                          {program.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}

                {actions.length > 0 && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Field
                      as={TextField}
                      select
                      label="Typ działania"
                      name="action_name"
                      error={touched.action_name && Boolean(errors.action_name)}
                      helperText={<ErrorMessage name="action_name" />}
                      onChange={(e: { target: { value: any } }) => {
                        const selected_action_name = e.target.value;
                        const selected_action = actions.find((action) => action.name === selected_action_name);
                        setFieldValue("action_name", selected_action_name);
                        setFieldValue("action_id", selected_action ? selected_action._id : ""); // Set the corresponding ID
                      }}
                    >
                      {actions.map((action) => (
                        <MenuItem key={action._id} value={action.name}>
                          {action.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                )}

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button color="primary" variant="contained" type="submit">
                    Dodaj
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        <Box mt={4}>{miernik_items.length > 0 && <MiernikAppTable data={miernik_items} />}</Box>
      </Box>
    </SitesContainer>
  );
};

export default MiernikApp;
