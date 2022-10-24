import { useNavigate, useParams } from "react-router-dom";
import { urlPackagesBox } from "../utils/endpoints";
import { packageBoxCreationDTO, packageBoxPutGetDTO } from './packagesBox.model';
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import Loading from "../utils/Loading";
import ShowErrors from "../utils/ShowErrors";
import { convertPackageToFormData } from '../utils/FormDataUtils';
import FormPackagesBox from './FormPackageBox';

export default function EditPackageBox() {
  const [packageBox, setPackageBox] = useState<packageBoxCreationDTO>();
  const [packageBoxPutGet, setPackageBoxToyPutGet] = useState<packageBoxPutGetDTO>();
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${urlPackagesBox}/PutGet/${id}`)
      .then((answer: AxiosResponse<packageBoxPutGetDTO>) => {
        const model: packageBoxCreationDTO = {
          name: answer.data.packageBox.name,
          imageLink: answer.data.packageBox.image,
          description: answer.data.packageBox.description,
          priorityShippingDate: new Date(answer.data.packageBox.priorityShippingDate),
        };
        setPackageBox(model);
        setPackageBoxToyPutGet(answer.data);
      });
  }, [id]);

  async function edit(packageBoxToEdit: packageBoxCreationDTO) {
    try {
      const formData = convertPackageToFormData(packageBoxToEdit);
      await axios({
        method: "put",
        url: `${urlPackagesBox}/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/packagebox/${id}`);
    } 
    catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Editar Paquete</h3>
      
      <ShowErrors errors={errors} />
      {packageBox && packageBoxPutGet ? (
        <FormPackagesBox
          providersSelected={packageBoxPutGet.providers}
          warehousesSelected={packageBoxPutGet.warehousesSelected}
          warehousesNotSelected={packageBoxPutGet.warehousesNotSelected}
          categoriesNotSelected={packageBoxPutGet.categoriesNotSelected}
          categoriesSelected={packageBoxPutGet.categoriesSelected}
          model={packageBox}
          onSubmit={async (values) => await edit(values)}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}


