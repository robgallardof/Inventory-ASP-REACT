import { urlCategories } from "../utils/endpoints";
import EditEntity from "../utils/EditEntity";
import { CategoryCreationDTO, CategoryDTO } from "./category.model";
import FormCategory from "./FormCategory";

export default function EditCategory() {
  return (
    <>
      <EditEntity<CategoryCreationDTO, CategoryDTO>
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
