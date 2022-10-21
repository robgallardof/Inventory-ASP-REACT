import { claim, answerAutenticacion } from "./auth.model";

const keyToken = "token";
const keyExpiration = "token-expiraTion"

export function saveTokenLocalStorage(autenticacion: answerAutenticacion){
    localStorage.setItem(keyToken, autenticacion.token);
    localStorage.setItem(keyExpiration, autenticacion.expiration.toString());
}

export function obtainClaims(): claim[]{
    const token = localStorage.getItem(keyToken);

    if (!token){
        return [];
    }

    const expiration = localStorage.getItem(keyExpiration)!;
    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date()){
        logout();
        return [];
    }

    const dataToken = JSON.parse(atob(token.split(".")[1]));
    const answers: claim[] = [];
    for (const property in dataToken){
        answers.push({name: property, value: dataToken[property]});
    }

    return answers;
}

export function logout(){
    localStorage.removeItem(keyToken);
    localStorage.removeItem(keyExpiration);
}

export function obtainToken(){
    return localStorage.getItem(keyToken);
}