import React, { useEffect, useState } from 'react';
import DataList from '../../../Components/DataList/DataList.js';
import { useUserContext } from '../../../context/UserProvider.js';
import testimonialAPI from '.././../../shared/APICalls';
import Button from '../../../Components/Buttons/Buttons';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useUserContext();
    useEffect(() => {
        const getTestimonials = async () => {
            try {
                const res = await testimonialAPI.get('/testimonials')
                setTestimonials(res.data)
            } catch (error) {
                setTestimonials([]);
            } finally {
                setTimeout(function () {
                    setLoading(false)
                }, 500);
            }
        }
        getTestimonials();
    }, []);

    return (
        <div className='min-h-full m-auto my-[56px]'>
            <h1 className='font-bold text-4xl mb-[54px] text-center'>Testimonios</h1>
            <DataList data={testimonials} loading={loading} type='testimonial' title='testimonios' />
            {user && (
                <div className='flex justify-center mt-[56px]'>
                    <Button route='/testimonials-create' buttonName='Agregar un testimonio' styles='primaryButton' />
                </div>
            )}
        </div>
    );
}

export default Testimonials;