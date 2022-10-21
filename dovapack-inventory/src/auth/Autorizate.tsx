import { ReactElement, useContext, useEffect, useState } from "react";
import AuthContex from "./AutenticacionContext";

export default function Autorizate(props: autorizateProps) {
    const [isAutorizate, setIsAutorizate] = useState(false);
    const { claims } = useContext(AuthContex);

    useEffect(() => {
        if (props.role) {
            const index = claims.findIndex(claim =>
                claim.name === 'role' && claim.value === props.role)
            setIsAutorizate(index > -1);
        } else {
            setIsAutorizate(claims.length > 0);
        }
    }, [claims, props.role])

    return (
        <>
            {isAutorizate ? props.autorizate : props.notAutorizate}
        </>
    )
}

interface autorizateProps {
    autorizate: ReactElement;
    notAutorizate?: ReactElement;
    role?: string;
}