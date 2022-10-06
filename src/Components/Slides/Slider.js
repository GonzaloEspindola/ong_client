import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import slidesAPI from '../../shared/APICalls';
import Loader from '../Loader/Loader';

const Slider = () => {
    const [ slides, setSlides ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getSlides = async () => {
            try {
                const response = await slidesAPI.get('slides')
                console.log(response.data);
                setSlides(response.data)
            } catch (error) {
                setSlides([])
            } finally {
                setTimeout(function(){
                    setLoading(false)
                }, 1000);
            }
        }
        getSlides()
    }, [])

    return (
        !loading ? (
            slides.length ? (
                <Carousel className='max-w-full' autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false} transitionTime={700} emulateTouch={true} swipeable={true}>
                        {slides.map(({name, image}, i) => (
                            <div key={i}>
                                <img className='max-h-96 object-cover' src={image} alt={name}/>
                            </div>
                        ))}
                </Carousel>
            ) : (
                <p className='bg-yellow-200 p-1 pr-16 pl-16 font-semibold text-yellow-700 shadow-2xl'>No hay slides</p>
            )
        ) : (
            <Loader />
        )
    )
}

export default Slider;