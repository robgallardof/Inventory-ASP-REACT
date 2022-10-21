import { useEffect, useState } from "react";

export default function Pagination(props: paginationProps) {

    const [listLinks, setListLinks] = useState<modelLink[]>([]);

    useEffect(() => {
        const lastPageEnabled = props.currentPage !== 1;
        const lastPage = props.currentPage - 1;
        const links: modelLink[] = [];

        links.push({
            text: 'Anterior',
            enabled: lastPageEnabled,
            page: lastPage,
            active: false
        });

        for (let i = 1; i <= props.quantityTotalPages; i++) {
            if (i >= props.currentPage - props.radio && i <= props.currentPage + props.radio) {
                links.push({
                    text: `${i}`,
                    active: props.currentPage === i,
                    enabled: true, page: i
                })
            }
        }

        const nextPageEnabled = props.currentPage !== props.quantityTotalPages && props.quantityTotalPages > 0;
        const nextPage = props.currentPage + 1;
        links.push({
            text: 'Siguiente',
            page: nextPage,
            enabled: nextPageEnabled,
            active: false
        });

        setListLinks(links);
    }, [props.currentPage, props.quantityTotalPages, props.radio])

    function obtainClass(link: modelLink){
        if (link.active){
            return "active pointer"
        }

        if (!link.enabled){
            return "disabled";
        }

        return "pointer"
    }

    function selectPage(link: modelLink){
        if (link.page === props.currentPage){
            return;
        }

        if (!link.enabled){
            return;
        }

        props.onChange(link.page);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {listLinks.map(link => <li key={link.text}
                 onClick={() => selectPage(link)}
                 className={`page-item cursor ${obtainClass(link)}`}
                >
                    <span className="page-link">{link.text}</span>
                </li>)}
            </ul>
        </nav>
    )
}

interface modelLink {
    page: number;
    enabled: boolean;
    text: string;
    active: boolean;
}

interface paginationProps {
    currentPage: number;
    quantityTotalPages: number;
    radio: number;
    onChange(page: number): void;
}

Pagination.defaultProps = {
    radio: 3
}