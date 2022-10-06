import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ element, title, size, index }) => {
    const navigate = useNavigate();
    switch (title) {
        case 'new':
            return (
                <div className="flex flex-col rounded-2xl bg-light-blue border-[1px] border-dark-blue max-w-[448px] min-h-[233px] text-xs items-center shadow-xl overflow-hidden sm:grid sm:grid-cols-2 sm:max-h-[233px]">
                    <div className="flex justify-center items-center h-full">
                        <img className="object-cover w-full h-full" src={element.image} alt={element.name} />
                    </div>
                    <div className="flex flex-col justify-between px-[16px] pb-[16px] h-full w-full">
                        <p className="text-[20px] text-center pt-4 font-bold">{element.name}</p>
                        <p className="text-left h-4/4 line-clamp-[6] font-semibold text-xs">{element.content}</p>
                        <button className="bg-dark-blue rounded-lg text-white h-9 shadow-xl hover:bg-blue-800" onClick={() => navigate(`/news/${element.id}`)}>Ver novedad</button>
                    </div>
                </div>
            )
        case 'testimonial':
            return (
                <div key={element.id} className="rounded-2xl bg-[#FDFFA4] border-[1px] border-[#F9FE00] max-w-[212px] min-w-[212px] max-h-[254px] min-h-[254px] text-xs items-center shadow-xl p-4">
                    <img className="object-cover w-[75px] h-[75px] rounded-full" src={element.image} alt={element.name} />
                    <p className="font-semibold text-base">{element.name}</p>
                    <p className="text-left h-2/4 line-clamp-[6] font-medium">{element.content}</p>
                </div>
            )
        case 'member':
            return (
                <div className="rounded-2xl border-[1px] max-w-[212px] min-w-[212px] max-h-[234px] min-h-[234px] text-xs shadow-xl bg-cover flex flex-col justify-end pb-5 text-center" style={{ backgroundImage: `url(${element.image})` }}>
                    <p className="font-bold text-white text-2xl">{element.name}</p>
                    <p className="text-white font-bold">{element.rol}</p>
                </div>
            )
        case 'activity':
            return (
                <div className="flex flex-col rounded-2xl bg-red-200 border-[1px] border-red-500 max-w-[448px] min-h-[233px] text-xs items-center shadow-xl overflow-hidden sm:grid sm:grid-cols-2 sm:max-h-[233px]">
                    <div className="flex justify-center items-center h-full">
                        <img className="object-cover w-full h-full" src={element.image} alt={element.name} />
                    </div>
                    <div className="flex flex-col justify-between px-[16px] pb-[16px] h-full w-full">
                        <p></p>
                        <p className="text-left h-4/4 line-clamp-[6] font-semibold text-xs">{element.content}</p>
                        <button className="bg-red-500 rounded-lg text-white h-9 shadow-xl hover:bg-red-800" onClick={() => navigate(`/activities/${element.id}`)}>Ver actividad</button>
                    </div>
                </div>
            )
        case 'backoffice':
            return (
                <div key={index} className={`flex flex-col items-center justify-center shadow-lg p-8 w-${size} h-max-content border hover:bg-gray-100 hover:cursor-pointer`} onClick={() => navigate(`/backoffice/${element.route}`)}>
                    <h1>{element.name}</h1>
                    <img src={element.image} alt={element.name} className='w-20 my-2' />
                </div>
            )
        case 'backoffice-min':
            return (
                <div key={index} className={`flex flex-col items-center justify-center shadow-lg h-max-content border hover:bg-gray-100 hover:cursor-pointer p-2`} onClick={() => navigate(`/backoffice/${element.route}`)}>
                    <img src={element.image} alt={element.name} className='w-12 p-2' />
                </div>
            )
        default:
            break;
    }
}

export default Card;