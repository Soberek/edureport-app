import { Box, Button, MenuItem, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MiernikAppTable } from "./MiernikAppTable";
import useMiernikAppFormik from "./useMiernikApp";
import SiteTitle from "../../components/SiteTitle/SiteTitle";
import SitesContainer from "../../components/SiteContainer/SiteContainer";
const MiernikApp = () => {
  const { handlePostMiernikItem, initialFormData, validationSchema, miernikItems, actions, programNames, loading } =
    useMiernikAppFormik();

  if (loading === true) return <SitesContainer>Loading... (best UI experience)</SitesContainer>;

  return (
    <SitesContainer>
      <SiteTitle>🧮 Miernik Budżetowy (wersja mongodb)</SiteTitle>
      <Box>
        <Formik
          initialValues={initialFormData}
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
                    name="peopleCount"
                    label="People Count"
                    type="number"
                    error={touched.peopleCount && values.peopleCount < 0}
                    helperText={<ErrorMessage name="people_count" />}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="actionCount"
                    label="Action Count"
                    type="number"
                    error={touched.actionCount && values.actionCount < 0}
                    helperText={<ErrorMessage name="action_count" />}
                    size="small"
                  />
                </Grid>

                {/* Program name */}
                {programNames.length > 0 && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      defaultValue={""}
                      label="Nazwa programu"
                      name="programName"
                      error={touched.programName && Boolean(errors.programName)}
                      helperText={<ErrorMessage name="program_name" />}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const selectedProgramName = e.target.value;
                        const selectedProgram = programNames.find((program) => program.name === selectedProgramName);
                        setFieldValue("programName", selectedProgramName);
                        setFieldValue("programId", selectedProgram ? selectedProgram._id : ""); // Set the corresponding ID
                      }}
                      // size="small"
                    >
                      {programNames.map((program) => (
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
                      name="actionName"
                      error={touched.actionName && Boolean(errors.actionName)}
                      helperText={<ErrorMessage name="action_name" />}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const selectedActionName = e.target.value;
                        const selectedAction = actions.find((action) => action.name === selectedActionName);
                        setFieldValue("actionName", selectedActionName);
                        setFieldValue("actionId", selectedAction ? selectedAction._id : ""); // Set the corresponding ID
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

        <Box mt={4}>{miernikItems.length > 0 && <MiernikAppTable data={miernikItems} />}</Box>
      </Box>
    </SitesContainer>
  );
};

export default MiernikApp;
