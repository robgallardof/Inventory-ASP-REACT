import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { urlPackagesBox } from "./utils/endpoints";
import AlertContext from "./utils/AlertContext";
import ListPackages from "./PackageBox/ListPackageBox";
import { landingPageDTO } from "./PackageBox/packagesBox.model";

export default function LandingPage() {
  const [packageBox, setPackages] = useState<landingPageDTO>({});

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
        {/* <h3>Paquetes disponibles</h3>
        <ListPackages packageBox={packageBox.inWarehouse} /> */}

        <h3>Nuevos Paquetes</h3>
        <ListPackages packageBox={packageBox.priorityShippingPackages} />
      </AlertContext.Provider>
    </>
  );
}
