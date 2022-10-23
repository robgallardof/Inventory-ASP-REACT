import { Form, Formik, FormikHelpers } from "formik";
import { providerCreationDTO } from "./provider.model";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Buttons";
import { Link } from "react-router-dom";
import FormGroupsImage from "../utils/FormGroupImage";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";

export default function FormProvider(props: formProviderProps) {
  const schemeProvider = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre del Proveedor debe de tener más de 2 caracteres.")
      .max(50, "El nombre del Proveedor debe de tener menos de 50 caracteres.")
      .required("El nombre del Proveedor es requerido.")
      .firstCapitalLetter(),
  });

  return (
    <Formik
      initialValues={props.model}
      validationSchema={schemeProvider}
      onSubmit={props.onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormGroupText
            field="name"
            label="Nombre del Proveedor"
            placeholder="Nombre del proveedor"
          />
          <FormGroupsImage
            field="image"
            label="Imagen"
            imageLink={props.model.imageLink}
          />
          <FormGroupMarkdown field="biography" label="Biografía" />
          <Button disabled={isSubmitting} type="submit">
            Guardar
          </Button>
          <Link className="btn btn-secondary" to="/provider">
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface formProviderProps {
  model: providerCreationDTO;
  onSubmit(
    values: providerCreationDTO,
    action: FormikHelpers<providerCreationDTO>
  ): void;
}
