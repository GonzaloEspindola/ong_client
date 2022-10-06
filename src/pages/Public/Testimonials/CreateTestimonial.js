import React from "react";
import BackofficeForm from "../../../Components/DynamicForm/BackofficeForm";
import { useUserContext } from "../../../context/UserProvider";
import * as Yup from "yup";

const CreateTestimonial = () => {
  const {user} = useUserContext();

  const validation = Yup.object({
    name: Yup.string().required("Campo obligatorio"),
    content: Yup.string().required("Campo obligatorio")
})

  if (user) {
    const testimonialData =
    {
      name: '',
      content: '',
      image: user.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }

    return (
      <div className="w-screen">
        <BackofficeForm fields={testimonialData} method='POST' route='testimonials' path='/testimonials' title='Crear testimonio' hidden={'hidden'} validation={validation}/>
      </div>
    )
  } else {
    return <p>No existen datos</p>
  }

}

export default CreateTestimonial;



