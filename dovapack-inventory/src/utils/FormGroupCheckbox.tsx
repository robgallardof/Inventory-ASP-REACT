import { Field } from "formik";

export default function FormGroupCheckbox(props: formGroupCheckbox) {
    return (
        <div className="form-group form-check">
            <Field className="form-check-input" id={props.field} name={props.field}
                type="checkbox"
            />
            <label htmlFor={props.field}>{props.label}</label>
        </div>
    )
}

interface formGroupCheckbox {
    label: string;
    field: string;
}