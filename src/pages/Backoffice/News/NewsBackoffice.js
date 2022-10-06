import { useEffect, useState } from "react";
import Table from '../../../Components/Table/Table';
import { Routes, Route, useNavigate } from "react-router-dom";
import BackofficeForm from "../../../Components/DynamicForm/BackofficeForm";
import APICalls from "../../../shared/APICalls";
import { deleteSweetAlert } from "../../../Components/utils/sweetAlerts";
import * as Yup from "yup";

const NewsBackoffice = () => {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getNews = async () => {
            const res = await APICalls.get('/news')
            const { data } = res
            setNews(data)
        }
        getNews();
    }, [])

    const SUPPORTED_FORMATS = 'data:image'

    const validation = Yup.object({
        name: Yup.string().required("Obligatorio"),
        content: Yup.string().required("Obligatorio"),
        image: Yup.mixed().required("Obligatorio")
            .test(
                'fileFormat',
                'Solo se aceptan formatos JPG, JPEG, GIF y PNG',
                (value) => (value || SUPPORTED_FORMATS.includes(value?.slice(0, 10)))
            )
    })

    const newsData = {
        name: '',
        content: '',
        image: ''
    }


    const handleCreate = () => {
        navigate('create', {
            state: {
                fields: newsData,
                method: 'POST',
                route: 'news',
                title: 'Crear Novedad'
            }
        })
    }
    const handleEdit = (data) => {
        navigate('edit', {
            state: {
                fields: newsData,
                data,
                method: 'PUT',
                route: 'news',
                title: 'Editar Novedad'
            }
        })
    }
    const handleDelete = async (values) => {
        deleteSweetAlert(values, 'news')
    }
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Table
                        title='Novedades'
                        tableHeader={['Nombre', /*'Imagen',*/ 'Contenido']}
                        tableData={news}
                        requiredProperties={['name', /*'image',*/'content', 'createdAt']}
                        buttons={[
                            { type: 'Editar', handler: handleEdit },
                            { type: 'Eliminar', handler: handleDelete }
                        ]}
                    />
                    <button className='px-6 py-2 w-fit bg-red-600 text-white border rounded-lg hover:bg-red-700 self-center text-sm shadow-lg mb-16' onClick={handleCreate}>Agregar Novedad</button>
                </>
            } />
            <Route path='/create' element={<BackofficeForm validation={validation} />} />
            <Route path='/edit' element={<BackofficeForm validation={validation} />} />
        </Routes>
    )
}

export default NewsBackoffice;