import css from "./IndividualPackageBox.module.css";
// import { Link } from "react-router-dom";
// import Button from "../utils/Buttons";
// import Confirm from "../utils/Confirm";
// import axios from "axios";
// import { useContext } from "react";
// import AlertContext from "../utils/AlertContext";
// import Autorizate from "../auth/Autorizate";
import { packageBoxDTO } from "./packagesBox.models";
// import { urlPackagesBox } from "../utils/endpoints";

export default function IndividualPackage(props: individualPackageBoxProps) {
  // Construcción del Link.
  const buildLink = () => `/packagebox/${props.packageBox.id}`;
  // const alerts = useContext(AlertContext);

  // function DeletePackageBox() {
  //   axios.delete(`${urlPackagesBox}/${props.packageBox.id}`).then(() => {
  //     alerts();
  //   });
  // }

  return (
    <div className={css.div}>
      <a href={buildLink()}>
        <img src={props.packageBox.image} alt="Imagen" />
      </a>
      <p>
        <a href={buildLink()}>{props.packageBox.name}</a>
      </p>
      {/* <Autorizate
        role="admin"
        autorizate={
          <div>
            <Link
              style={{ marginRight: "1rem" }}
              className="btn btn-info"
              to={`/packagebox/edit/${props.packageBox.id}`}
            >
              Editar
            </Link>
            <Button
              onClick={() => Confirm(() => DeletePackageBox())}
              className="btn btn-danger"
            >
              Borrar
            </Button>
          </div>
        }
      /> */}
    </div>
  );
}

interface individualPackageBoxProps {
  packageBox: packageBoxDTO;
}
