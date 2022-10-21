import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { warehouseDTO } from "../warehouse/warehouse.models";
import { CategoryDTO } from "../categories/category.model";
import { urlPackagesBox } from "../utils/endpoints";
import { convertPackageToFormData } from "../utils/FormDataUtils";
import Loading from "../utils/Loading";
import ShowErrors from "../utils/ShowErrors";
import FormPackages from "./FormPackageBox";
import { packageBoxPostGetDTO, packageBoxCreationDTO } from "./packagesBox.models";

export default function CreatePackage() {
  const [categoriesNotSelected, setCategoriesNotSelected] = useState<
    CategoryDTO[]
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

  async function create(pack: packageBoxCreationDTO) {
    try {
      const formData = convertPackageToFormData(pack);
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
    }
  }

  return (
    <>
      <h3>Crear Paquete</h3>
      <ShowErrors errors={errors} />
      {loaded ? 
        <FormPackages
          providersSelected={[]}
          warehousesNotSelected={warehousesNotSelected}
          warehousesSelected={[]}
          categoriesNotSelected={categoriesNotSelected}
          categoriesSelected={[]}
          model={{
            name: "",
            inWarehouse: false,
            description: "",
            price: 0,
            review: "",
          }}
          onSubmit={async values => create(values)}
        />
       : (
        <Loading />
      )}
    </>
  );
}
