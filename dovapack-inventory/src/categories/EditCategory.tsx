import { urlCategories } from "../utils/endpoints";
import EditEntity from "../utils/EditEntity";
import { categoryCreationDTO, categoryDTO } from "./category.model";
import FormCategory from "./FormCategory";

export default function EditCategory() {
  return (
    <>
      <EditEntity<categoryCreationDTO, categoryDTO>
        url={urlCategories}
        urlIndex="/category"
        nameEntity="Categorías"
      >
        {(entity, edit) => (
          <FormCategory
            model={entity}
            onSubmit={async (values) => {
              edit(values);
            }}
          />
        )}
      </EditEntity>
    </>
  );
}
