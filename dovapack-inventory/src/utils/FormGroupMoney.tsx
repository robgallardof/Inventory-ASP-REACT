import { Field, ErrorMessage } from "formik";
import ShowErrorField from "./ShowErrorField";

export default function FormGroupNumber(props: formGroupTextProps) {
  return (
    <div className="form-group">
      {props.label ? <label htmlFor={props.field}>{props.label}</label> : null}

      <Field
        type="number"
        name={props.field}
        className="form-control"
        placeholder={props.placeholder}
      />
   
      <ErrorMessage name={props.field}>
        {(message) => <ShowErrorField message={message} />}
      </ErrorMessage>
    </div>
  );
}

interface formGroupTextProps {
  field: string;
  label?: string;
  placeholder?: string;
}

