
import { urlWarehouses } from "../utils/endpoints";
import IndexEntity from "../utils/IndexEntity";
import { warehouseDTO } from "./warehouse.models";

export default function IndexWareHouse() {
  return (
    <>
      <IndexEntity<warehouseDTO>
        url={urlWarehouses}
        urlCreate="/warehouse/create"
        title="Almacenes"
        nameEntity="Almacen"
      >
        {(warehouses, buttons) =>
          <>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {warehouses?.map(warehouse =>
                <tr key={warehouse.id}>
                  <td>
                    {buttons(`/warehouse/edit/${warehouse.id}`, warehouse.id)}
                  </td>
                  <td>
                    {warehouse.name}
                  </td>
                </tr>)}
            </tbody>
          </>
        }

      </IndexEntity>
    </>
  );
}
