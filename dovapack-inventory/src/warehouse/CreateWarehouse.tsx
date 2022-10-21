import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlWarehouses } from "../utils/endpoints";
import ShowErrors from "../utils/ShowErrors";
import FormWarehouse from "./FormWarehouse";

import { warehouseCreationDTO } from "./warehouse.models";

export default function CreateWarehouse() {
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState<string[]>([]);

  async function create(warehouse: warehouseCreationDTO) {
    try{
      await axios.post(urlWarehouses, warehouse)
      navigate('/warehouse')
    }
    catch(error){
      setErrors(error.response.data)
    }
  }

  return (
    <>
      <h3>Crear Almacen</h3>

      <ShowErrors errors={errors}/>
      <FormWarehouse
        model={{
          name: ""
        }}
        onSubmit={async values => await create(values)}
      />
    </>
  );
}
