import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import ShowErrors from "./ShowErrors";

export default function EditEntity<TCreation, TLecture>(
  props: editEntityProps<TCreation, TLecture>
) {
  const { id }: any = useParams();
  const [entity, setEntity] = useState<TCreation>();
  const [errors, setErrors] = useState<string[]>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${props.url}/${id}`).then((answer: AxiosResponse<TLecture>) => {
      setEntity(props.transform(answer.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function edit(entityEdit: TCreation) {
    try {
      if (props.transformFormData) {
        const formData = props.transformFormData(entityEdit);
        await axios({
          method: "put",
          url: `${props.url}/${id}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.put(`${props.url}/${id}`, entityEdit);
      }
      navigate(props.urlIndex);
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Editar {props.nameEntity}</h3>
      <ShowErrors errors={errors} />
      {entity ? props.children(entity, edit) : <Loading />}
    </>
  );
}

interface editEntityProps<TCreation, TLecture> {
  url: string;
  urlIndex: string;
  nameEntity: string;
  children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
  transform(entity: TLecture): TCreation;
  transformFormData?(model: TCreation): FormData;
}

EditEntity.defaultProps = {
  transform: (entity: any) => entity
};
