import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { coordinateDTO } from "../utils/coordinates.model";
import Loading from "../utils/Loading";
import MapLeaflet from "../utils/Map";
import { packageBoxDTO } from "./packagesBox.model";
import { urlPackagesBox } from "../utils/endpoints";

export default function DetailPackage() {
  const { id }: any = useParams();
  const [packagebox, setPackageBox] = useState<packageBoxDTO>();

  useEffect(() => {
    axios
      .get(`${urlPackagesBox}/${id}`)
      .then((answer: AxiosResponse<packageBoxDTO>) => {
        answer.data.priorityShippingDate = new Date(
          answer.data.priorityShippingDate
        );
        setPackageBox(answer.data);
      });
  }, [id]);

  function transformCoordinates(): coordinateDTO[] {
    if (packagebox?.warehouses) {
      const coordinates = packagebox.warehouses.map((warehouse) => {
        return {
          lat: warehouse.latitude,
          lng: warehouse.longitude,
          name: warehouse.name,
        } as coordinateDTO;
      });
      return coordinates;
    }
    return [];
  }

  return packagebox ? (
    <div style={{ display: "flex" }}>
      <div>
        <h2>
          {packagebox.name} ({packagebox.priorityShippingDate.getFullYear()})
        </h2>
        {packagebox.categories?.map((category) => (
          <Link
            key={category.id}
            style={{ marginRight: "5px" }}
            className="btn btn-primary btn-sm rounded-pill"
            to={`/packagebox/filter?categoryId=${category.id}`}
          >
            {category.name}
          </Link>
        ))}
        | {packagebox.priorityShippingDate.toDateString()}
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <span style={{ display: "inline-block", marginRight: "1rem" }}>
            <img
              src={packagebox.image}
              style={{ width: "225px", height: "315px" }}
              alt="Imagen Paquete"
            />
          </span>
        </div>
        {packagebox.description ? (
          <div style={{ marginTop: "1rem" }}>
            <h3>Descripción</h3>
            <div>
              <ReactMarkdown>{packagebox.description}</ReactMarkdown>
            </div>
          </div>
        ) : null}
        {packagebox.providers && packagebox.providers.length > 0 ? (
          <div style={{ marginTop: "1rem" }}>
            <h3>Proveedores</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {packagebox.providers?.map((provider) => (
                <div key={provider.id} style={{ marginBottom: "2px" }}>
                  <img
                    alt="Imagen Proveedor"
                    src={provider.image}
                    style={{ width: "50px", verticalAlign: "middle" }}
                  />
                  <span
                    style={{
                      display: "inline-block",
                      width: "200px",
                      marginLeft: "1rem",
                    }}
                  >
                    {provider.name}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: "45px",
                    }}
                  >
                    ...
                  </span>
                  {/* <span>{provider.personaje}</span> */}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {packagebox.warehouses && packagebox.warehouses.length > 0 ? (
          <div>
            <h2>Establecido en el siguiente Almacen</h2>
            <MapLeaflet onlyRead={true} coordinates={transformCoordinates()} />
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
