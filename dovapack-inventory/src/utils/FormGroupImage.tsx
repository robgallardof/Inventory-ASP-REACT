import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

export default function FormGroupImage(props: FormGroupImageProps) {
  // Styles.
  const divStyle = { marginTop: "10px" };
  const imgStyle = { width: "450px" };

  // Estado imagen base 64.
  const [imageBase64, setImageBase64] = useState("");

  // Estado imagen link.
  const [imageLink, setImageLink] = useState(props.imageLink);

  const { values } = useFormikContext<any>();

  // Cargar imagen.
  const controlOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      convertBase64(file)
        .then((representationBase64: string) =>
          setImageBase64(representationBase64)
        )
        .catch((error) => console.error(error));

      values[props.field] = file;
      setImageLink("");
    }
  };

  // Convertir a base 64.
  const convertBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="form-group">
      <label htmlFor={props.label}></label>
      <div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={controlOnChange}
          className="form-control" 
        />
      </div>
      {imageBase64 ? (
        <div>
          <div style={divStyle}>
            <img
              style={imgStyle}
              src={imageBase64}
              alt="Imagen seleccionada"
            ></img>
          </div>
        </div>
      ) : null}
      {imageLink ? (
        <div>
          <div style={divStyle}>
            <img
              style={imgStyle}
              src={imageLink}
              alt="Imagen seleccionada"
            ></img>
          </div>
        </div>
      ) : null}
    </div>
  );
}

interface FormGroupImageProps {
  field: string;
  label: string;
  imageLink: string;
}

FormGroupImage.defaultProps = {
  imageLink: "",
};
