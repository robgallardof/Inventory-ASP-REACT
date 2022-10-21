import { useFormikContext } from "formik";
import { coordinateDTO } from "./coordinates.model";
import MapLeaflet from "./Map";

export default function FormMap(props: formMapProps) {
  const { values } = useFormikContext<any>();

  // Vincular datos del Mapa con Formik.
  function updateFields(coordinates: coordinateDTO) {
    values[props.fieldLat] = coordinates.lat;
    values[props.fieldLong] = coordinates.lng;
  }

  return (
    <MapLeaflet coordinates={props.coordinates} manageClickMap={updateFields} />
  );
}

interface formMapProps {
  coordinates: coordinateDTO[];
  fieldLat: string;
  fieldLong: string;
}

FormMap.defaultProps = {
  coordinates: [],
};
