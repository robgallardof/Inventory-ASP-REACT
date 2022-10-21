import { providerDTO } from "./provider.model";
import { urlProviders } from "../utils/endpoints";
import IndexEntity from "../utils/IndexEntity";

export default function IndexProvider() {
  return (
    <>
      <IndexEntity<providerDTO>
        url={urlProviders}
        urlCreate="/provider/create"
        title="Proveedores"
        nameEntity="proveedor"
      >
        {(providers, buttons) => (
          <>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {providers?.map((provider) => (
                <tr key={provider.id}>
                  <td>{buttons(`/provider/edit/${provider.id}`, provider.id)}</td>
                  <td>{provider.name}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
