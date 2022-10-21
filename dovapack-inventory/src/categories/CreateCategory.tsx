import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlCategories } from "../utils/endpoints";
import ShowErrors from "../utils/ShowErrors";

import { CategoryCreationDTO } from "./category.model";
import FormCategory from "./FormCategory";

export default function CreateCategory() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(category: CategoryCreationDTO) {
    try {
      await axios.post(urlCategories, category);
      navigate("/category");
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Crear Categoria</h3>
      <ShowErrors errors={errors}/>
      <FormCategory
        model={{ name: "" }}
        onSubmit={async (values) => {
          await create(values);
        }}
      />
    </>
  );
}
