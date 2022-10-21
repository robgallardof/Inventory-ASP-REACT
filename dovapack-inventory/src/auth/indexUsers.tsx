import axios from "axios";
import Swal from "sweetalert2";
import Button from "../utils/Buttons";
import Confirm from "../utils/Confirm";
import { urlAccounts } from "../utils/endpoints";
import IndexEntity from "../utils/IndexEntity";
import { userDTO } from "./auth.model";

export default function IndexUsers() {
  async function makeAdmin(id: string) {
    await editAdmin(`${urlAccounts}/MakeAdmin`, id);
  }

  async function removeAdmin(id: string) {
    await editAdmin(`${urlAccounts}/RemoveAdmin`, id);
  }

  async function editAdmin(url: string, id: string) {
    await axios.post(url, JSON.stringify(id), {
      headers: { "Content-Type": "application/json" },
    });

    Swal.fire({
      title: "Exito",
      text: "Operación realizada con éxito",
      icon: "success",
    });
  }

  return (
    <IndexEntity<userDTO> url={`${urlAccounts}/listUsers`} title="Usuarios">
      {(usuarios) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.map((user) => (
              <tr key={user.id}>
                <td>
                  <Button
                    onClick={() =>
                      Confirm(
                        () => makeAdmin(user.id),
                        `¿Desea hacer a ${user.email} admin?`,
                        "Realizar"
                      )
                    }
                  >
                    Hacer Admin
                  </Button>
                  <Button
                    className="btn btn-danger"
                    style={{ marginLeft: "1rem" }}
                    onClick={() =>
                      Confirm(
                        () => removeAdmin(user.id),
                        `¿Desea remover a ${user.email} como admin?`,
                        "Realizar"
                      )
                    }
                  >
                    Remover Admin
                  </Button>
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </IndexEntity>
  );
}
