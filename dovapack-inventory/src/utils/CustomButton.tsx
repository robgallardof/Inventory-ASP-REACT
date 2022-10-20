import Button from '@mui/material/Button';

export default function CustomButton(props : customButtonProps){
    return <Button variant="contained">{props.children}</Button>
}

interface customButtonProps{
    children: React.ReactNode;
}