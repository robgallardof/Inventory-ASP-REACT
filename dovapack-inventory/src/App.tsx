import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import "./App.css";
import { landingPageDTO } from './Packages/packages.model';
import PackagesList from "./Packages/PackagesList";
import CustomButton from "./utils/CustomButton";

function App() {

  const [packages, setPackages] = useState<landingPageDTO>({});

  useEffect(() =>{
    const timerId = setTimeout(()=>{
      setPackages({
        inSucursal: [
          {
            id: 1,
            name: "Box",
            image: "https://i.imgur.com/FyaVIB5.png",
          },
          {
            id: 2,
            name: "Box Two",
            image: "https://i.imgur.com/FyaVIB5.png",
          },
        ],
         newPackages:  [
          {
            id: 4,
            name: "Box Three",
            image: "https://i.imgur.com/FyaVIB5.png",
          },
          {
            id: 5,
            name: "Box Four",
            image: "https://i.imgur.com/FyaVIB5.png",
          },
        ]
      })
    },1000)

    return() => clearTimeout(timerId);
  })


  return (
    <Container>
      <CustomButton> text</CustomButton>
      <h3>In Store</h3>
      <PackagesList packages={packages.inSucursal}/>

      <h3>Current Packages</h3>
      <PackagesList packages={packages.newPackages}/>
    </Container>
  );
}

export default App;
