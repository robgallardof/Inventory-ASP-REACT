import Swal from "sweetalert2";

export default function confirm(
  onConfirm: any,
  title: string = "¿Desea borrar el registro?",
  textButtonConfirmation: string = "Borrar"
) {
    Swal.fire({
        title: title,
        confirmButtonText: textButtonConfirmation,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then(result => {
        if (result.isConfirmed){
            onConfirm();
        }
    })
}
