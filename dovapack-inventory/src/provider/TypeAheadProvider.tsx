import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { urlProviders } from "../utils/endpoints";
import { providerPackageBoxDTO } from "./provider.model";

export default function TypeAheadprovider(props: typeAheadproviderProps) {
  const [options, setOptions] = useState<providerPackageBoxDTO[]>([]);

  const selection: providerPackageBoxDTO[] = [];

  const [elementDragged, setElementDragged] = useState<providerPackageBoxDTO | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);

  function manageFind(query: string) {
    setIsLoading(true);
    axios
      .get(`${urlProviders}/findByName/${query}`)
      .then((answer: AxiosResponse<providerPackageBoxDTO[]>) => {
        setOptions(answer.data);
        setIsLoading(false);
      });
  }

  function manageDragStart(provider: providerPackageBoxDTO) {
    setElementDragged(provider);
  }

  function manageDragOver(provider: providerPackageBoxDTO) {
    if (!elementDragged) {
      return;
    }

    if (provider.id !== elementDragged.id) {
      const elementDraggedIndex = props.providers.findIndex(
        (x) => x.id === elementDragged.id
      );
      const providerIndex = props.providers.findIndex((x) => x.id === provider.id);

      const providers = [...props.providers];
      providers[providerIndex] = elementDragged;
      providers[elementDraggedIndex] = provider;
      props.onAdd(providers);
    }
  }

  return (
    <>
      <label>Proveedores</label>
      <AsyncTypeahead
        id="typeahead"
        onChange={providers => {
          if (props.providers.findIndex((x) => x.id === providers[0].id) === -1) {
            props.onAdd([...props.providers, providers[0]]);
          }
        }}
        options={options}
        labelKey={(providers) => providers.name}
        filterBy={() => true}
        isLoading={isLoading}
        onSearch={manageFind}
        placeholder={"Escriba el nombre del Proveedor"}
        minLength={1}
        flip={true}
        selected={selection}
        renderMenuItemChildren={provider => (
          <>
            <img
              alt="imagen provider"
              src={provider.image}
              style={{
                height: "64px",
                marginRight: "10px",
                width: "64px",
              }}
            />
            <span>{provider.name}</span>
          </>
        )}
      />
      <ul className="list-group">
        {props.providers.map(provider => (
          <li
            draggable={true}
            onDragStart={() => manageDragStart(provider)}
            onDragOver={() => manageDragOver(provider)}
            className="list-group-item list-group-item-action"
            key={provider.id}
          >
            {props.listUI(provider)}
            <span
              className="badge rounded-pill text-bg-danger pointer"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => props.onRemove(provider)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

interface typeAheadproviderProps {
  providers: providerPackageBoxDTO[];
  onAdd(providers: providerPackageBoxDTO[]): void;
  listUI(provider: providerPackageBoxDTO): ReactElement;
  onRemove(provider: providerPackageBoxDTO): void;
}
