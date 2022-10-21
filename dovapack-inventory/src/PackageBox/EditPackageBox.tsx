import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlPackagesBox } from "../utils/endpoints";
import { convertPackageToFormData } from "../utils/FormDataUtils";
import Loading from "../utils/Loading";
import ShowErrors from "../utils/ShowErrors";
import FormPackages from "./FormPackageBox";
import { packageBoxCreationDTO, packageBoxPutGetDTO } from "./packagesBox.models";


export default function EditPackage() {
  const [packagesbox, setPackage] = useState<packageBoxCreationDTO>();
  const [packPutGet, setPackagePutGet] = useState<packageBoxPutGetDTO>();
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${urlPackagesBox}/PutGet/${id}`)
      .then((answer: AxiosResponse<packageBoxPutGetDTO>) => {
        const model: packageBoxCreationDTO = {
          name: answer.data.packagebox.name,
          inWarehouse: answer.data.packagebox.inWarehouse,
          review: answer.data.packagebox.review,
          imageLink: answer.data.packagebox.image,
          description: answer.data.packagebox.description,
          comingSoonDate: new Date(answer.data.packagebox.comingSoonDate),
          price: answer.data.packagebox.price,
        };
        setPackage(model);
        setPackagePutGet(answer.data);
      });
  }, [id]);

  async function edit(packToEdit: packageBoxCreationDTO) {
    try {
      const formData = convertPackageToFormData(packToEdit);
      await axios({
        method: "put",
        url: `${urlPackagesBox}/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/packagebox/${id}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Editar Película</h3>
      <ShowErrors errors={errors} />
      {packagesbox && packPutGet ? (
        <FormPackages
          providersSelected={packPutGet.providers}
          warehousesSelected={packPutGet.branchesSelected}
          warehousesNotSelected={packPutGet.warehousesNotSelected}
          categoriesNotSelected={packPutGet.categoriesNotSelected}
          categoriesSelected={packPutGet.categoriesSelected}
          model={packagesbox}
          onSubmit={async (values) => await edit(values)}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
