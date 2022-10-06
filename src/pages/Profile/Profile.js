import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useUserContext } from "../../context/UserProvider";

const Profile = () => {

    const { user } = useUserContext();

    if (user) {
        const userData = {
            'Imagen:': user.image,
            'Nombre:': user.firstName,
            'Segundo Nombre:': user.lastName,
            'Email:': user.email,
            'Rol:': user.roleId
        }

        return (
            <>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <div className="flex flex-grow h-full justify-center items-center">
                        <div className="my-6 shadow-lg flex flex-col h-full w-3/4 items-center p-6 border">
                            <h1 className="text-5xl font-semibold mb-4">Perfil</h1>
                            {Object.entries(userData).map((value, index) => {
                                return (
                                    <>
                                        <label className="mb-2 mt-3" key={value[0]}>{value[0] !== 'Imagen:' ? value[0] : ''}</label>
                                        {generateInputs(value, index )}
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        )
    } else {
        return (
            <p>Nada que mostrar</p>
        )
    }
}

const generateInputs = (value, index) => {
    switch (value[0]) {
        case 'Nombre:':
        case 'Segundo Nombre:':
        case 'Email:':
            return (
                <input 
                    className="w-3/5 border border-solid rounded-lg border-gray-400 mr-8 p-2.5"
                    value={value[1]}
                    key={index}
                    disabled
                 />
            )
        case 'Rol:':
            return (
                <>
                    <label key={index} className='bg-yellow-200 p-1 pr-16 pl-16 font-semibold text-yellow-700 shadow-2xl text-center m-auto'>{value[1] === "1" ? 'Standard' : 'Administrador'}</label>
                </>
            )
        case 'Imagen:': 
            return (
                <img key={index} src={value[1] === null ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : value[1]} alt={value[1]} className='object-cover w-[140px] h-[140px] rounded-full border'/>
            )
        default:
            break;
    }
}

export default Profile;