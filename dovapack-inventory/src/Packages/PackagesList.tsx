import { packageDTO } from "./packages.model";
import IndividualPackage from "./IndividualPackage";
import css from "./PackagesList.module.css";
import GenericList from "../utils/GenericList";

export default function PackagesList(props: packagesListProps) {
  return (
    <GenericList list={props.packages} LoadingUI={<>Loading...</>}>
      <div className={css.div}>
        {props.packages?.map((packageInventory) => (
          <IndividualPackage {...packageInventory} key={packageInventory.id} />
        ))}
      </div>
    </GenericList>
  );
}

interface packagesListProps {
  packages?: packageDTO[];
}
