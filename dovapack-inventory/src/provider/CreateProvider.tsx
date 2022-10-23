import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlProviders } from "../utils/endpoints";
import { convertProviderToFormData } from "../utils/FormDataUtils";
import ShowErrors from "../utils/ShowErrors";
import { providerCreationDTO } from "./provider.model";
import FormProvider from "./FormProvider";

export default function CreateProvider() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(provider: providerCreationDTO) {
    try {
      const formData = convertProviderToFormData(provider);
      await axios({
        method: "post",
        url: urlProviders,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/provider");
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Crear Proveedor</h3>
      <ShowErrors errors={errors} />
      <FormProvider
        model={{ name: "" }}
        onSubmit={async (values) => {
          await create(values);
        }}
      />
    </>
  );
}
