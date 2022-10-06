import React, { useEffect, useState } from "react";
import BackofficeForm from "../../../Components/DynamicForm/BackofficeForm";
import APICalls from "../../../shared/APICalls";
import * as Yup from "yup";

const HomeBackoffice = () => {
    const [ homeData, setHomeData ] = useState({})
    const validation = Yup.object({
        welcomeText: Yup.string().required("Obligatorio").min(20, "Texto de bienvenida demasiado corto - debe de contener al menos 20 caracteres."),
    })

    useEffect(() => {
        const gethome = async () => {
            const res = await APICalls.get('/organizations')
            console.log(res);
            const requiredData = {
                id: res.data[0].id,
                welcomeText: res.data[0].welcomeText
            }
            setHomeData(requiredData)
        }
        gethome();
    }, [])

    if(JSON.stringify(homeData) === '{}') {
        return (
            <p>Ha ocurrido un error</p>
        )
    }else {
        return (
            <BackofficeForm fields={homeData} method='PUT' route='organization' path='/backoffice' title='Editar home' validation={validation}/>
        )
    }
}

export default HomeBackoffice;