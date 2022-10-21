import GenericList from "../utils/GenericList";
import { packageBoxDTO } from "./packagesBox.models";
import css from "./ListPackagesBox.module.css";
import IndividualPackageBox from "./IndividualPackageBox";


export default function ListPackages(props: listPackagesProps) {
  return (
    <GenericList list={props.packagebox}>
      <div className={css.div}>
        {props.packagebox?.map((packagesbox) => (
          <IndividualPackageBox key={packagesbox.id} packagebox={packagesbox} />
        ))}
      </div>
    </GenericList>
  );
}

interface listPackagesProps {
  packagebox?: packageBoxDTO[];
}
