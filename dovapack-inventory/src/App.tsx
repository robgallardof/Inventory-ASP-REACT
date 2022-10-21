import "./App.css";
import Menu from "./utils/Menu";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import routes from "./route-config";
import configureValidations from "./validations";
import AuthContex from "./auth/AutenticacionContext";
import { configurateInterceptor } from "./utils/interceptors";
import { useState, useEffect } from "react";
import { claim } from "./auth/auth.model";
import { obtainClaims } from "./auth/manageJWT";

configureValidations();
configurateInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(obtainClaims());
  }, []);

  function update(claims: claim[]) {
    setClaims(claims);
  }

  function isAdministrator() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "admin"
      ) > -1
    );
  }

  return (
    <>
      <BrowserRouter>
        <AuthContex.Provider value={{ claims, update }}>
          <Menu />
          <div className="container">
            <Routes>
              {routes.map(({ path, element: Component, isAdmin }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isAdmin && !isAdministrator() ? (
                      <>No tiene permiso para acceder a este componente</>
                    ) : (
                      <Component />
                    )
                  }
                />
              ))}
            </Routes>
          </div>
        </AuthContex.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
