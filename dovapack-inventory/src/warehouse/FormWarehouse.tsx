import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../utils/Buttons";
import FormGroupText from "../utils/FormGroupText";
import { Link } from "react-router-dom";
import FormMap from "../utils/FormMap";
import { coordinateDTO } from "../utils/coordinates.model";
import { warehouseCreationDTO } from "./warehouse.models";

export default function FormWarehousees(props: formWarehouseProps) {
  const schemaBranches = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre de la proveedor debe de tener más de 2 caracteres")
      .max(50, "El nombre de la proveedor debe de tener menos de 50 caracteres")
      .required("El nombre de la proveedor es requerido")
      .firstCapitalLetter(),
  });

  function transformCoordinates(): coordinateDTO[] | undefined {
    if (props.model.latitude && props.model.longitude) {
      const answer: coordinateDTO = {
        lat: props.model.latitude,
        lng: props.model.longitude,
      };
      return [answer];
    }
    return undefined;
  }

  return (
    <Formik
      initialValues={props.model}
      validationSchema={schemaBranches}
      onSubmit={props.onSubmit}
    >
      {({ errors, isSubmitting }) => {
        return (
          <Form>
            <FormGroupText label="Nombre" field="name" />
            <div style={{ marginBottom: "1rem" }}>
              <FormMap
                fieldLat={"latitude"}
                fieldLong={"longitude"}
                coordinates={transformCoordinates()}
              />
            </div>

            <Button
              disabled={isSubmitting || Object.keys(errors).length > 0}
              type="submit"
            >
              Guardar
            </Button>
            <Link className="btn btn-secondary" to="/warehouse">
              Cancelar
            </Link>
          </Form>
        );
      }}
    </Formik>
  );
}

interface formWarehouseProps {
  model: warehouseCreationDTO;
  onSubmit(
    values: warehouseCreationDTO,
    actions: FormikHelpers<warehouseCreationDTO>
  ): void;
}
