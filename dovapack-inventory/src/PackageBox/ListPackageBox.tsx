import GenericList from "../utils/GenericList";
import { packageBoxDTO } from "./packagesBox.model";
import css from "./ListPackagesBox.module.css";
import IndividualPackageBox from "./IndividualPackageBox";


export default function ListPackages(props: listPackagesProps) {
  return (
    <GenericList list={props.packageBox}>
      <div className={css.div}>
        {props.packageBox?.map((packagesbox) => (
          <IndividualPackageBox key={packagesbox.id} packageBox={packagesbox} />
        ))}
      </div>
    </GenericList>
  );
}

interface listPackagesProps {
  packageBox?: packageBoxDTO[];
}
