import { useFormikContext } from "formik";
import ShowErrorField from "./ShowErrorField";

export default function FormGroupDate(props: forGroupDateProps) {
  const { values, validateForm, touched, errors } = useFormikContext<any>();
  console.log('values', values);
  console.log('props.field', values[props.label]);
  return (
    <div className="form-group">
      <label htmlFor={props.field}>{props.label}</label>
      <input
        type="date"
        className="form-control"
        id={props.field}
        name={props.field}
        defaultValue={values[props.field]?.toLocaleDateString("en-CA")}
        onChange={(e) => {
          const date = new Date(e.currentTarget.value + "T00:00:00");
          values[props.field] = date;
          validateForm();
        }}
      />
      {touched[props.field] && errors[props.field] ? (
        <ShowErrorField message={errors[props.field]?.toString()!} />
      ) : null}
    </div>
  );
}

interface forGroupDateProps {
  field: string;
  label: string;
}
