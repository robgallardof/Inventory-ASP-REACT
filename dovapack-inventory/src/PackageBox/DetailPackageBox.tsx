import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { urlRatings, urlPackagesBox } from "../utils/endpoints";
import { coordinateDTO } from "../utils/coordinates.model";
import Loading from "../utils/Loading";
import MapLeaflet from "../utils/Map";
import Swal from "sweetalert2";
import Rating from "../utils/Rating";
import { packageBoxDTO } from "./packagesBox.models";

export default function DetailPackage() {
  const { id }: any = useParams();
  const [pack, setPackage] = useState<packageBoxDTO>();

  useEffect(() => {
    axios.get(`${urlPackagesBox}/${id}`).then((answer: AxiosResponse<packageBoxDTO>) => {
      answer.data.comingSoonDate = new Date(answer.data.comingSoonDate);
      setPackage(answer.data);
    });
  }, [id]);

  function transformCoordinates(): coordinateDTO[] {
    if (pack?.warehouses) {
      const coordinates = pack.warehouses.map((branch) => {
        return {
          lat: branch.latitude,
          lng: branch.longitude,
          name: branch.name,
        } as coordinateDTO;
      });
      return coordinates;
    }

    return [];
  }

  function generateURLYoutubeEmbed(url: any): string {
    if (!url) {
      return "";
    }

    var videoId = url.split("v=")[1];
    var positionAmpersand = videoId.indexOf("&");
    if (positionAmpersand !== -1) {
      videoId = videoId.substring(0, positionAmpersand);
    }

    return `https://www.youtube.com/embed/${videoId}`;
  }

  async function onVote(vote: number) {
    await axios.post(urlRatings, { punctuation: vote, packId: id });
    Swal.fire({ icon: "success", title: "Voto recibido" });
  }

  return pack ? (
    <div style={{ display: "flex" }}>
      <div>
        <h2>
          {pack.name} ({pack.comingSoonDate.getFullYear()})
        </h2>
        {pack.categories?.map((category) => (
          <Link
            key={category.id}
            style={{ marginRight: "5px" }}
            className="btn btn-primary btn-sm rounded-pill"
            to={`/pack/filter?categoryId=${category.id}`}
          >
            {category.name}
          </Link>
        ))}
        | {pack.comingSoonDate.toDateString()}| {pack.averageVote!}
        | Valoraciones:
        <Rating maxValue={5} valueSelected={pack.voteUser!} onChange={onVote} />
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <span style={{ display: "inline-block", marginRight: "1rem" }}>
            <img
              src={pack.image}
              style={{ width: "225px", height: "315px" }}
              alt="Imagen Paquete"
            />
          </span>
          {pack.review ? (
            <div>
              <iframe
                title="review"
                width="560"
                height="315"
                src={generateURLYoutubeEmbed(pack.review)}
                frameBorder={0}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : null}
        </div>
        {pack.description ? (
          <div style={{ marginTop: "1rem" }}>
            <h3>Descripción</h3>
            <div>
              <ReactMarkdown>{pack.description}</ReactMarkdown>
            </div>
          </div>
        ) : null}
        {pack.providers && pack.providers.length > 0 ? (
          <div style={{ marginTop: "1rem" }}>
            <h3>Proveedores</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {pack.providers?.map((provider) => (
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
        {pack.warehouses && pack.warehouses.length > 0 ? (
          <div>
            <h2>Mostrándose en los siguiente warehouses</h2>
            <MapLeaflet onlyRead={true} coordinates={transformCoordinates()} />
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
