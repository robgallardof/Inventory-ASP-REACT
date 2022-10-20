import { ReactElement } from "react";
import Loading from "./Loading";

export default function GenericList(props: genericListProps) {
  if (!props.list) {
    if (props.LoadingUI) {
      return props.LoadingUI;
    }
    return <Loading />;
  } else if (props.list.length === 0) {
    if (props.emptyListUI) {
      return props.emptyListUI;
    }
    return <>There are no elements to display</>;
  } else {
    return props.children;
  }
}

interface genericListProps {
  list: any;
  LoadingUI?: ReactElement;
  emptyListUI?: ReactElement;
  children: ReactElement;
}
