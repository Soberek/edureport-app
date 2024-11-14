import SitesContainer from "../../components/SiteContainer/SiteContainer";
import SiteTitle from "../../components/SiteTitle/SiteTitle";
import * as yup from "yup";
import { TextField, Button, Grid2, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { postAction } from "../../api/api";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export interface initialActionFormValuesI {
  name: string;
}

const initialActionFormValues: initialActionFormValuesI = {
  name: ""
};

export const Actions = () => {
  const [error, setError] = useState<null | string>(null);
  const actionValidationSchema = yup.object({
    name: yup.string().required("Nazwa akcji jest wymagana.")
  });

  const handleSubmit = async (
    values: initialActionFormValuesI,
    { setSubmitting }: FormikHelpers<initialActionFormValuesI>
  ) => {
    try {
      const response = await postAction(values);
      if (response) {
      } else {
        setError("Wystąpił błąd poczas dodawania akcji.");
      }
    } catch (err) {
      console.error("Error submitting action:", err);

      if (err instanceof AxiosError) {
        setError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError(null);
    }, 2000);

    return () => clearTimeout(errorTimeout);
  }, [error]);

  return (
    <SitesContainer>
      <SiteTitle> Akcje </SiteTitle>
      <Formik validationSchema={actionValidationSchema} initialValues={initialActionFormValues} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Grid2 container>
              <Grid2 size={{ xs: 6 }}></Grid2>
              <Field
                as={TextField}
                name="name"
                label="Nazwa akcji"
                size="small"
                error={touched.name && Boolean(errors.name)}
                helperText={<ErrorMessage name="name" />}
              />
            </Grid2>

            <Button sx={{ my: 2 }} type="submit" disabled={isSubmitting} variant="contained">
              Dodaj akcje
            </Button>
          </Form>
        )}
      </Formik>

      {error ? (
        <Typography sx={{ color: "white", backgroundColor: "red", px: 1, py: 1, borderRadius: "10px" }}>
          {error}
        </Typography>
      ) : null}
    </SitesContainer>
  );
};
