import { Formik, Form, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Buttons";
import FormGroupText from "../utils/FormGroupText";
import * as Yup from "yup";
import { CategoryCreationDTO } from "./category.model";

export default function FormCategory(props: formCategoryProps) {
  const schemaCategory = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre de la categoria debe de tener más de 2 caracteres")
      .max(50, "El nombre de la categoria debe de tener menos de 50 caracteres")
      .required("El nombre de la categoria es requerido")
      .firstCapitalLetter(),
  });

  return (
    <Formik
      initialValues={props.model}
      validationSchema={schemaCategory}
      onSubmit={props.onSubmit}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <FormGroupText
            field="name"
            label="Nombre la categoria"
            placeholder="Nombre categoria"
          />
          <Button
            disabled={isSubmitting || Object.keys(errors).length > 0}
            type="submit"
          >
            Guardar
          </Button>
          <Link className="btn btn-secondary" to="/category">
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface formCategoryProps {
  model: CategoryCreationDTO;
  onSubmit(
    values: CategoryCreationDTO,
    action: FormikHelpers<CategoryCreationDTO>
  ): void;
}
