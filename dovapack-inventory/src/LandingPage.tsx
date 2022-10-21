import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { urlPackagesBox } from "./utils/endpoints";
import AlertContext from "./utils/AlertContext";
import ListPackages from "./PackageBox/ListPackageBox";
import { landingPageDTO } from "./PackageBox/packagesBox.models";

export default function LandingPage() {
  const [packagebox, setPackages] = useState<landingPageDTO>({});

  useEffect(() => {
    LoadData();
  }, []);

  function LoadData() {
    axios.get(urlPackagesBox).then((answer: AxiosResponse<landingPageDTO>) => {
      setPackages(answer.data);
    });
  }

  return (
    <>
      <AlertContext.Provider value={() => LoadData()}>
        <h3>Paquetes disponibles</h3>
        <ListPackages packagebox={packagebox.inWarehouse} />

        <h3>Próximos Paquetes</h3>
        <ListPackages packagebox={packagebox.newPackages} />
      </AlertContext.Provider>
    </>
  );
}
