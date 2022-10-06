import React, { useEffect, useState } from "react";
import Table from '../../../Components/Table/Table';
import { Routes, Route, useNavigate } from "react-router-dom";
import BackofficeForm from "../../../Components/DynamicForm/BackofficeForm";
import APICalls from "../../../shared/APICalls";
import { deleteSweetAlert } from "../../../Components/utils/sweetAlerts";
import * as Yup from "yup";

const TestimonialsBackoffice = () => {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const getTestimonials = async () => {
      const res = await APICalls.get('/testimonials')
      const { data } = res
      setTestimonials(data)
    }
    getTestimonials();
  }, [])

  const testimonialsData = {
    name: '',
    content: '',
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  }

  const handleCreate = () => {
    navigate('create', {
      state: {
        fields: testimonialsData,
        method: 'POST',
        route: 'testimonials',
        title: 'Crear Testimonial',
        prevRoute: 'backoffice'
      }
    })
  }

  const handleDelete = async (values) => {
    deleteSweetAlert(values, 'testimonials')
  }

  const handleEdit = (data) => {
    navigate('edit', {
      state: {
        fields: testimonialsData,
        data,
        method: 'PUT',
        route: 'testimonials',
        title: 'Editar Testimonial',
        prevRoute: 'backoffice'
      }
    })
  }

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Table
            title='Testimonios'
            tableHeader={['Nombre', 'Contenido']}
            tableData={testimonials}
            requiredProperties={['name', 'content', 'createdAt']}
            buttons={[
              { type: 'Editar', handler: handleEdit },
              { type: 'Eliminar', handler: handleDelete }
            ]}
          />
          <button className='px-6 py-2 w-fit bg-red-600 text-white border rounded-lg hover:bg-red-700 self-center text-sm shadow-lg mb-16' onClick={handleCreate}>Agregar testimonio</button>
        </>
      } />
      <Route path='/create' element={<BackofficeForm validation={validation} />} />
      <Route path='/edit' element={<BackofficeForm validation={validation} />} />
    </Routes>
  )
}

export default TestimonialsBackoffice;