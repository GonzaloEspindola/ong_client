import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerFieldData } from "../../../data/formsData";
import DynamicForm from "../../../Components/DynamicForm/DynamicForm";

function SignUp() {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Campo obligatorio"),
        lastName: Yup.string().required("Campo obligatorio"),
        email: Yup.string().email().required("Campo obligatorio"),
        password: Yup.string()
          .required("Campo obligatorio")
          .min(6, "Contraseña demasiado corta - debe contener al menos 6 caracteres."),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <div className="flex h-full w-full my-8 md:my-0">
        <div className="w-full text-center justify-center h-full md:grid md:grid-cols-2">
          <div className="flex flex-col justify-center items-center w-3/4 m-auto md:col-start-2">
            <div className="mb-8">
              <h6>Bienvenido</h6>
              <h3 className="text-3xl">Crea tu cuenta!</h3>
            </div>
            <DynamicForm buttonName="Registrate" data={registerFieldData} />
          </div>
          
          <img
            className="hidden h-full w-full md:flex md:row-start-1"
            src="https://media.istockphoto.com/photos/united-through-their-diversity-picture-id614211848?k=20&m=614211848&s=612x612&w=0&h=XJA_xolV3AOcgiOvYEHX2dlRqCFhMNaceRh7oB6A5Hg="
            alt="login-img"
          />
      </div>
    </div>
    </Formik>
  );
}

export default SignUp;
