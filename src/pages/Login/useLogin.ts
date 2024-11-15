import * as Yup from "yup";
import { LoginI } from "../../types/Auth";

const initial_login_values: LoginI = {
  username: "",
  password: ""
};

export const useLogin = () => {
  const validationSchema = Yup.object<LoginI>({
    username: Yup.string()
      .min(5, "Nazwa użytkownika musi mieć przynajmniej 5 znaków.")
      .required("Nazwa użytkownika nie może być pusta"),
    password: Yup.string().min(5, "Hasło musi mieć przynajmniej 5 znaków.").required("Hasło nie może być puste")
  });

  return { validationSchema, initial_login_values };
};
