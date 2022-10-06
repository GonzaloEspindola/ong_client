import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import BackofficeForm from "../../../Components/DynamicForm/BackofficeForm";
import Table from "../../../Components/Table/Table";
import APICalls from "../../../shared/APICalls";
import { slidesFieldData } from '../../../data/formsData';
import * as Yup from "yup";

const Slides = () => {
    const [slidesData, setSlides] = useState({});
    const navigate = useNavigate();

    const SUPPORTED_FORMATS = 'data:image'

    const validation = Yup.object({
        text: Yup.string().required("Obligatorio"),
        image: Yup.mixed().required("Obligatorio")
            .test(
                'fileFormat',
                'Solo se aceptan formatos JPG, JPEG, GIF y PNG',
                (value) => (value || SUPPORTED_FORMATS.includes(value?.slice(0, 10)))
            )
    })

    useEffect(() => {
        const getSlides = async () => {
            const res = await APICalls.get('/slides')
            setSlides(res.data)
        }
        getSlides();
    }, [])

    const handleEdit = (data) => {
        navigate('edit', {
            state: {
                fields: slidesFieldData,
                data,
                method: 'PUT',
                route: 'slides',
                title: 'Editar slide'
            }
        })
    }

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Table
                        title='Slides'
                        tableHeader={[/*'Imagen',*/ 'Titulo']}
                        tableData={slidesData}
                        requiredProperties={[/*'image',*/ 'text', 'createdAt']}
                        buttons={[
                            { type: 'Editar', handler: handleEdit }
                        ]}
                    />
                </>
            } />
            <Route path='/edit' element={<BackofficeForm validation={validation} />} />
        </Routes>
    )
}

export default Slides;