import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../utils/endpoints";
import ShowErrors from "../utils/ShowErrors";
import AuthContex from "./AutenticacionContext";
import { credentialUser, answerAutenticacion } from "./auth.model";
import FormAuth from "./FormAuth";
import { saveTokenLocalStorage, obtainClaims } from "./manageJWT";

export default function Register() {
    const [errors, setErros] = useState<string[]>([]);
    const {update: update} = useContext(AuthContex);
    const navigate = useNavigate();
    
    async function singUp(credentials: credentialUser) {
        try {
            const answer = await axios
                .post<answerAutenticacion>(`${urlAccounts}/create`, credentials);
                saveTokenLocalStorage(answer.data);
                update(obtainClaims());
                navigate("/");
            console.log(answer.data);
        } catch (error) {
            setErros(error.response.data);
        }
    }
    return (
        <>
            <h3>Registro</h3>
            <ShowErrors errors={errors} />
            <FormAuth model={{ email: '', password: '' }}
                onSubmit={async values => await singUp(values)}
            />
        </>

    )
}