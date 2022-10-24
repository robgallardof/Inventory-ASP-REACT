import { urlProviders } from "../utils/endpoints";
import EditEntity from "../utils/EditEntity";
import { convertProviderToFormData } from "../utils/FormDataUtils";
import { providerCreationDTO, providerDTO } from "./provider.model";
import FormProvider from "./FormProvider";

export default function EditProvider() {
  const transform = (provider: providerDTO) => {
    return {
      name: provider.name,
      imageLink: provider.image,
    };
  };

  return (
    <>
      <EditEntity<providerCreationDTO, providerDTO>
        url={urlProviders}
        urlIndex="/provider"
        nameEntity="Proovedores"
        transformFormData={convertProviderToFormData}
        transform={transform}
      >
        {(entity, edit) => (
          <FormProvider model={entity} onSubmit={async (values) => edit(values)} />
        )}
      </EditEntity>
    </>
  );
}
