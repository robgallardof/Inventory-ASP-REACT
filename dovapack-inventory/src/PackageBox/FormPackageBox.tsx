import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupImage from "../utils/FormGroupImage";
import Button from "../utils/Buttons";
import { Link } from "react-router-dom";
import { categoryDTO } from "../categories/category.model";
import { useState } from "react";
import SelectorMultiple, {
  selectorMultipleModel,
} from "../utils/SelectorMultiple";
import { warehouseDTO } from "../warehouse/warehouse.models";
import { providerPackageBoxDTO } from "../provider/provider.model";
import FormGroupNumber from "../utils/FormGroupMoney";
import FormGroupDate from "../utils/FormGroupDate";
import { packageBoxCreationDTO } from "./packagesBox.models";
import TypeAheadProvider from "../provider/TypeAheadProvider";

export default function FormPackagesBox(props: FormPackageProps) {
  const schemaPackages = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre del paquete debe de tener más de 2 caracteres")
      .max(50, "El nombre de la proveedor debe de tener menos de 50 caracteres")
      .required("El nombre de la proveedor es requerido")
      .firstCapitalLetter(),
    description: Yup.string()
      .min(3, "La descripción del paquetedebe de tener más de 2 caracteres")
      .max(50, "La descripción debe de tener menos de 50 caracteres")
      .required("La descripción es requerido")
      .firstCapitalLetter(),
      // price: Yup.number()
      // .min(1,"El precio del paquete debe ser mayor a $0")
      // .max(1000,"El precio del paquete debe ser menor a $1000")
      // .required("El precio del paquete es requerido."),
  });

  const [categoriesSelected, setCategoriesSelected] = useState(
    mapped(props.categoriesSelected)
  );
  const [categoriesNotSelected, setCategoriesNotSelected] = useState(
    mapped(props.categoriesNotSelected)
  );

  const [warehousesSelected, setWarehousesSelected] = useState(
    mapped(props.warehousesSelected)
  );
  const [warehousesNotSelected, setWarehousesNotSelected] = useState(
    mapped(props.warehousesNotSelected)
  );

  const [providersSelected, setProvidersSelected] = useState<
    providerPackageBoxDTO[]
  >(props.providersSelected);

  function mapped(
    array: { id: number; name: string }[]
  ): selectorMultipleModel[] {
    return array.map((value) => {
      return { key: value.id, value: value.name };
    });
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values, actions) => {
        values.categoriesIds = categoriesSelected.map((value) => value.key);
        values.warehousesIds = warehousesSelected.map((value) => value.key);
        values.providers = providersSelected;
        props.onSubmit(values, actions);
      }}
      validationSchema={schemaPackages}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormGroupText
            field="name"
            label="Nombre Paquete"
            placeholder="Nombre Paquete"
          />

          {/* <FormGroupCheckbox label="En sucursal" field="inWarehouse" /> */}
          <FormGroupText label="Descripción" field={"description"} />
          {/* <FormGroupNumber label="Precio:" field={"price"} /> */}
          <FormGroupDate label="Fecha Lanzamiento" field="priorityShippingDate" />
        
          <FormGroupImage
            field="image"
            label="Imagen"
            imageLink={props.model.imageLink}
          />

          <div className="form-group">
            <label>Categoria:</label>
            <SelectorMultiple
              selected={categoriesSelected}
              notSelected={categoriesNotSelected}
              onChange={(selected, notSelected) => {
                setCategoriesSelected(selected);
                setCategoriesNotSelected(notSelected);
              }}
            />
          </div>

          <div className="form-group">
            <label>Sucursales:</label>
            <SelectorMultiple
              selected={warehousesSelected}
              notSelected={warehousesNotSelected}
              onChange={(selected, notSelected) => {
                setWarehousesSelected(selected);
                setWarehousesNotSelected(notSelected);
              }}
            />
          </div>

          <div className="form-group">
            <TypeAheadProvider
              onAdd={(providers) => {
                setProvidersSelected(providers);
              }}
              onRemove={(provider) => {
                const providers = providersSelected.filter(
                  (x) => x !== provider
                );
                setProvidersSelected(providers);
              }}
              providers={providersSelected}
              listUI={(provider: providerPackageBoxDTO) => (
                <>
                  {provider.name}  
                </>
              )
            }
            />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
          >
            Guardar
          </Button>
          <Link className="btn btn-secondary" to="/">
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface FormPackageProps {
  model: packageBoxCreationDTO;
  onSubmit(
    values: packageBoxCreationDTO,
    actions: FormikHelpers<packageBoxCreationDTO>
  ): void;
  categoriesSelected: categoryDTO[];
  categoriesNotSelected: categoryDTO[];
  warehousesSelected: warehouseDTO[];
  warehousesNotSelected: warehouseDTO[];
  providersSelected: providerPackageBoxDTO[];
}
