import { ReactElement } from "react";
import Loading from "./Loading";

// Lista Generica.
export default function GenericList(props: genericList) {
  if (!props.list) {
    if (props.loadingUI) {
      return props.loadingUI;
    }
    return <Loading />;
  } else if (props.list.length === 0) {
    if (props.emptyListUI) {
      return props.emptyListUI;
    }
    return <>No hay elementos para mostrar</>;
  } else {
    return props.children;
  }
}

interface genericList {
  list: any;
  children: ReactElement;
  loadingUI?: ReactElement;
  emptyListUI?: ReactElement;
}
