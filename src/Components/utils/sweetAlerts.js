import Swal from 'sweetalert2';
import APICalls from "../../shared/APICalls";

const deleteSweetAlert = (values, route) => {
    Swal.fire({
        title: 'Estas seguro de esto?',
        text: "Esta accion no es reversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar esto'
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                APICalls.delete(`/${route}/${values.id}`)
                Swal.fire(
                    'Eliminado!',
                    'Se ha eliminado correctamente',
                    'success'
                ).then(() => window.location.reload())
            } catch (error) {
                Swal.fire(
                    'Error',
                    'Ha ocurrido un error al intentar eliminar',
                    'error'
                )
            }
        }
    })
}

const postSweetAlert = async (values, route, prevRoute) => {
    console.log(values);
    // const prevImage = values.image
    try {
        // switch (values?.image) {
        //     case undefined:
        //         values.image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        //         break;
        //     default:
        //         values.image = prevImage
        //         break;
        // }
        await APICalls.post(`/${route}`, values)
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Creado con exito',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            padding: '1.5em',
            color: 'black'
        }).then(() => {
            if (route !== 'organization' && route !== 'contacts' && route !== 'testimonials') {
                window.location.replace(`/backoffice/${route}`)
            } else if(prevRoute === 'backoffice') {
                window.location.replace(`/backoffice/${route}`)
            }
        })
    } catch (error) {
        Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Ha ocurrido un error',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            padding: '1.5rem',
            color: 'black'
        })
    }
}

const putSweetAlert = async (values, route) => {
    try {
        await APICalls.put(`/${route}/${values.id}`, values)
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Editado con exito',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            padding: '1.5em',
            color: 'black'
        }).then(() => {
            if (route !== 'organization') {
                window.location.replace(`/backoffice/${route}`)
            }
        })
    } catch (error) {
        Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Ha ocurrido un error',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            padding: '1.5em',
            color: 'black'
        })
    }
}

const resultAlert = (text, state) => {

    if (state === 'error') {
        switch (text) {
            case 'User already exists':
                text = 'Ya existe un usuario registrado con ese mail'
                break;
            case 'Invalid credentials':
                text = 'Contraseña incorrecta'
                break;
            case "The user doesn't exist":
                text = 'Correo no registrado'
                break;
            default:
                text = 'Algo ha salido mal'
                break;
        }
    }

    Swal.fire({
        position: 'bottom-end',
        icon: state,
        // background: state === 'success' ? '#77dd77' : '#ff6961',
        padding: '1.5rem',
        backdrop: false,
        toast: true,
        title: text,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: state === 'success' ? true : false,
        color: 'black'
    })
}

const fileTypeAlert = () => {
    Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'El formato de archivo debe ser JPG, JPEG o PNG',
        showConfirmButton: false,
        timer: 1500
    })
}

export { deleteSweetAlert, postSweetAlert, putSweetAlert, resultAlert, fileTypeAlert };