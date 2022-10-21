import { urlWarehouses } from "../utils/endpoints";
import EditEntity from "../utils/EditEntity";
import FormWarehouse from "./FormWarehouse";
import { warehouseCreationDTO, warehouseDTO } from "./warehouse.models";

export default function EditWarehouse() {
  return (
      <EditEntity<warehouseCreationDTO, warehouseDTO>
        url={urlWarehouses}
        urlIndex="/warehouse"
        nameEntity="Almacenes"
      >
        {(entity, edit) => (
          <FormWarehouse
            model={entity}
            onSubmit={async (values) => {
              edit(values);
            }}
          />
        )}
      </EditEntity>
  );
}
