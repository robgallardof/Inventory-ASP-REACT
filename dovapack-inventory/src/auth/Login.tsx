import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAccounts } from "../utils/endpoints";
import ShowErrors from "../utils/ShowErrors";
import AuthContex from "./AutenticacionContext";
import { answerAutenticacion, credentialUser } from "./auth.model";
import FormAuth from "./FormAuth";
import { saveTokenLocalStorage as saveTokenLocalStorage, obtainClaims } from "./manageJWT";
export default function Login() {

    const {update} = useContext(AuthContex);
    const [Errors, setError] = useState<string[]>([]);
    const navigate = useNavigate();
    
    async function login(credentials: credentialUser) {
        try {
            const answer = await
                axios.post<answerAutenticacion>(`${urlAccounts}/login`, credentials);
            
                saveTokenLocalStorage(answer.data);
                update(obtainClaims());
                navigate("/");
            console.log(answer);
        }
        catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <>
            <h3>Login</h3>
            <ShowErrors errors={Errors} />
            <FormAuth
                model={{ email: '', password: '' }}
                onSubmit={async values => await login(values)}
            />
        </>
    )
}