import { Form, Formik, FormikHelpers } from "formik";
import { credentialUser } from "./auth.model";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Buttons";

export default function formAuth(props: formuAuthProps) {
  const schemeAuth = Yup.object().shape({
    email: Yup.string()
      .required("El email es requerido.")
      .email("Debe colocar un email válido"),
    password: Yup.string()
    .required("La contraseña es requerida")
  });

  return (
    <Formik
      initialValues={props.model}
      validationSchema={schemeAuth}
      onSubmit={props.onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormGroupText label="Email" field="email" />
          <FormGroupText label="Password" field="password" type="password" />

          <Button disabled={isSubmitting} type="submit">
            Enviar
          </Button>
          <Link className="btn btn-secondary" to="/">
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface formuAuthProps {
  model: credentialUser;
  onSubmit(
    values: credentialUser,
    actions: FormikHelpers<credentialUser>
  ): void;
}
