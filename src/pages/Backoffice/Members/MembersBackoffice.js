import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Table from '../../../Components/Table/Table';
import MembersAPI from '../../../shared/APICalls';
import BackofficeForm from "../../../Components/DynamicForm/BackofficeForm";
import { membersFieldData } from '../../../data/formsData';
import { deleteSweetAlert } from '../../../Components/utils/sweetAlerts';
import * as Yup from "yup";

const MembersBackoffice = () => {
    const [Members, setMembers] = useState([]);
    const navigate = useNavigate();

    const SUPPORTED_FORMATS = 'data:image'

    const validation = Yup.object({
        name: Yup.string().required("Obligatorio"),
        rol: Yup.string().required("Obligatorio"),
        image: Yup.mixed().required("Obligatorio")
            .test(
                'fileFormat',
                'Solo se aceptan formatos JPG, JPEG, GIF y PNG',
                (value) => (value || SUPPORTED_FORMATS.includes(value?.slice(0, 10)))
            )
    })

    useEffect(() => {
        const getMembers = async () => {
            const res = await MembersAPI.get('/members')
            setMembers(res.data)
        }
        getMembers();
    }, []);

    const handleEdit = (data) => {
        navigate('edit', {
            state: {
                fields: membersFieldData,
                data,
                method: 'PUT',
                route: 'members',
                title: 'Editar miembro'
            }
        })
    }

    const handleDelete = async (values) => {
        deleteSweetAlert(values, 'members')
    }

    const handleCreate = () => {
        navigate('create', {
            state: {
                fields: membersFieldData,
                method: 'POST',
                route: 'members',
                title: 'Crear miembro'
            }
        })
    }

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Table
                        title='Miembros'
                        tableHeader={['Nombre', 'Rol']}
                        tableData={Members}
                        requiredProperties={['name', 'rol', 'createdAt']}
                        buttons={[
                            { type: 'Editar', handler: handleEdit },
                            { type: 'Eliminar', handler: handleDelete }
                        ]}
                    />
                    <button className='px-6 py-2 w-fit bg-red-600 text-white border rounded-lg hover:bg-red-700 self-center text-sm shadow-lg mb-16' onClick={handleCreate}>Agregar miembro</button>
                </>
            } />
            <Route path='/create' element={<BackofficeForm validation={validation} />} />
            <Route path='/edit' element={<BackofficeForm validation={validation} />} />
        </Routes>
    )
}

export default MembersBackoffice;