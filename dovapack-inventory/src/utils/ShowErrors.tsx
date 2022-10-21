export default function ShowErrors(props: showErrorsProps){
    const style= {color: 'red'}
    return(
        <>
            {props.errors ? <ul style={style}>
                {props.errors.map((error, index) => <li key={index}>{error}</li>)}
            </ul> : null}
        </>
    )
}

interface showErrorsProps{
    errors?: string[];
}