import * as Yup from "yup";
import DynamicForm from '../../../Components/DynamicForm/DynamicForm';
import { contactsData } from '../../../data/formsData';
import { Formik } from 'formik';
import { postSweetAlert } from '../../../Components/utils/sweetAlerts';
import Button from '../../../Components/Buttons/Buttons';

const Contacts = () => {

  return (
    <Formik
      initialValues ={{
        name: '',
        email: '',
        phone: '',
        message: ''
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Campo obligatorio"),
        email: Yup.string().email().required("Campo obligatorio"),
        phone: Yup.number().required("Campo obligatorio"),
        message: Yup.string().required("Campo obligatorio")
      })}
      onSubmit = {(values) => {
        postSweetAlert(values, 'contacts')
      }}
    >
      <div className='flex flex-col gap-4 w-10/12 my-7 mx-auto items-center self-center'>
        <div className='flex flex-col gap-4 w-full items-center'>
          <h1 className='text-2xl font-semibold text-center sm:text-start'>¡Contactate con nosotros!</h1>
          <DynamicForm buttonName="Enviar mensaje" data={contactsData} />
          <Button route='/' buttonName='Ir al inicio' styles='secondaryButton'/>
        </div>
      </div>
    </Formik>
  )
}

export default Contacts



