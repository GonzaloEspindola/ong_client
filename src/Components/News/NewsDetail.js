import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import newAPI from '../../shared/APICalls';

const NewsDetail = () => {
    const [ news , setNews ] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const getNew = async () => {
            const res = await newAPI.get(`/news/${id}`)
            setNews(res.data)
        }
        getNew();
    }, [id]);

    return (
        <>
            <div className='w-full flex flex-col sm:flex-row'>
                <div>
                    <img src={news.image} alt="img" className='w-full object-cover h-full'/>
                </div>
                <div className='w-1/2 flex justify-center flex-col text-center m-auto my-3'>
                    <h2 className='my-2 font-bold text-2xl'>{news.name}</h2>
                    <p className='my-4 md:px-6'>{news.content}</p>
                    <button className='flex items-center justify-center my-2'>
                        <Link to="/" className="bg-red-500 p-2 rounded-xl text-white">Ir al inicio</Link>
                    </button>
                </div>
            </div>
        </>
    );
}

export default NewsDetail