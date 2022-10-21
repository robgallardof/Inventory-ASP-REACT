import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2";
import AuthContex from "../auth/AutenticacionContext";
import './Rating.css'

export default function Rating(props: ratingProps) {

    const {claims} = useContext(AuthContex);
    const [maxValueArray, setMaxValueArray] = useState<number[]>([]);
    const [valueSelected, setValueSelected] = useState(props.valueSelected);

    useEffect(() => {
        setMaxValueArray(Array(props.maxValue).fill(0));
    }, [props.maxValue])

    function manageMouseOver(vote: number){
        setValueSelected(vote);
    }

    function manageClick(vote: number){
        if (claims.length === 0){
            Swal.fire({title: "Error", text:'Debes loguearte para votar', icon: 'error'});
            return;
        }

        setValueSelected(vote);
        props.onChange(vote);
    }

    return (
        <>
            {maxValueArray.map((value, index) => <FontAwesomeIcon
                icon="star" key={index}
                onMouseOver={() => manageMouseOver(index + 1)}
                onClick={() => manageClick(index + 1)}
                className={`fa-lg pointer ${valueSelected >= index + 1 ? 'checked': null}`}
            />)}
        </>
    )
}

interface ratingProps {
    maxValue: number;
    valueSelected: number;
    onChange(vote: number): void;
}