import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { warehouseDTO } from "../warehouse/warehouse.models";
import { categoryDTO } from "../categories/category.model";
import { urlPackagesBox } from "../utils/endpoints";
import { convertPackageToFormData } from "../utils/FormDataUtils";
import Loading from "../utils/Loading";
import ShowErrors from "../utils/ShowErrors";
import FormPackagesBox from "./FormPackageBox";
import { packageBoxPostGetDTO, packageBoxCreationDTO } from "./packagesBox.models";

export default function CreatePackage() {
  const [categoriesNotSelected, setCategoriesNotSelected] = useState<
    categoryDTO[]
  >([]);
  const [warehousesNotSelected, setWarehousesNotSelected] = useState<warehouseDTO[]>(
    []
  );
  const [loaded, setLoaded] = useState(false);
  const navigation = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${urlPackagesBox}/postget`)
      .then((answer: AxiosResponse<packageBoxPostGetDTO>) => {
        setCategoriesNotSelected(answer.data.categories);
        setWarehousesNotSelected(answer.data.warehouses);
        setLoaded(true);
      });
  }, []);

  async function create(packageBox: packageBoxCreationDTO) {
    try {
      const formData = convertPackageToFormData(packageBox);
      await axios({
        method: "post",
        url: urlPackagesBox,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((answer: AxiosResponse<number>) => {
        navigation(`/packagebox/${answer.data}`);
      });
    } catch (error) {
      setErrors(error.response.data);
      console.log(error)
    }
  }

  return (
    <>
      <h3>Crear Paquete</h3>
      console.log(errors)
      <ShowErrors errors={errors} />
      {loaded ? 
        <FormPackagesBox
          providersSelected={[]}
          warehousesNotSelected={warehousesNotSelected}
          warehousesSelected={[]}
          categoriesNotSelected={categoriesNotSelected}
          categoriesSelected={[]}
          model={{
            name: "",
            // inWarehouse: false,
            description: "",
            // price: 0,
          }}
          onSubmit={async values => create(values)}
        />
       : (
        <Loading />
      )}
    </>
  );
}
