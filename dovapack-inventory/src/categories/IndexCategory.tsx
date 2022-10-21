import { urlCategories } from "../utils/endpoints";
import IndexEntity from "../utils/IndexEntity";
import { CategoryDTO } from "./category.model";

export default function IndexCategory() {

  return (
<>
    <IndexEntity<CategoryDTO>
    url={urlCategories} 
    urlCreate="/category/create" 
    title="Categorías"
    nameEntity="Categoría"
    >
      {(categories, buttons)=>
      <>
    <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map(category => 
            <tr key={category.id}>
              <td>
                {buttons(`/category/edit/${category.id}`, category.id)}
              </td>
              <td>
                {category.name}
              </td>
            </tr>)}
          </tbody>  
          </>
      }
          
          </IndexEntity>
    </>
  );
}
