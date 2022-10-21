import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from "./Buttons";
import Confirm from "./Confirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";


export default function IndiceEntidad<T>(props: indiceEntidadProps<T>) {

    const [entities, setEntities] = useState<T[]>();
    const [totalPages, setTotalPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, recordsPerPage])

    function loadData() {
        axios.get(props.url, {
            params: { page: page, recordsPorPagina: recordsPerPage }
        })
            .then((answer: AxiosResponse<T[]>) => {
                const totalOfRegisters =
                    parseInt(answer.headers['quantityTotalRegisters'], 10);
                setTotalPages(Math.ceil(totalOfRegisters / recordsPerPage));
                setEntities(answer.data);
            })
    }

    async function DeleteData(id: number) {
        try {
            await axios.delete(`${props.url}/${id}`)
            loadData();
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    const buttons = (urlEdit: string, id: number) => <>
        <Link className="btn btn-success" to={urlEdit}>Editar</Link>
        <Button
            onClick={() => Confirm(() => DeleteData(id))}
            className="btn btn-danger">Borrar</Button>
    </>

    return (
        <>
            <h3>{props.title}</h3>
            {props.urlCreate ?  <Link className="btn btn-primary" to={props.urlCreate}>
                Crear {props.nameEntity}
            </Link> : null }

            <div className="form-group" style={{ width: '150px' }}>
                <label>Registros por página:</label>
                <select
                    className="form-select"
                    defaultValue={10}
                    onChange={e => {
                        setPage(1);
                        setRecordsPerPage(parseInt(e.currentTarget.value, 10))
                    }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <GenericList list={entities}>
                <table className="table table-striped">
                    {props.children(entities!, buttons)}
                </table>
            </GenericList>

            <Pagination quantityTotalPages={totalPages}
                currentPage={page} onChange={newPage => setPage(newPage)} />

        </>
    )
}

interface indiceEntidadProps<T> {
    url: string;
    urlCreate?: string;
    children(entidades: T[],
        botones: (urlEditar: string, id: number) => ReactElement): ReactElement;
    title: string;
    nameEntity?: string;
}