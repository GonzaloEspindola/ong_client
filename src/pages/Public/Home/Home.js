import React, { useEffect, useState } from "react";
import ApiCall from '../../../shared/APICalls';
import image from "../../../images/image-2.png";
import Slider from '../../../Components/Slides/Slider';
import DataList from "../../../Components/DataList/DataList";
import LastDataLayout from "../../../Components/LastDataLayout/LastDataLayout";
import Button from "../../../Components/Buttons/Buttons";
import Loader from "../../../Components/Loader/Loader";

const Home = () => {
  const [organization, setOrganization] = useState({});
  const [news, setNews] = useState([]);
  const [members, setMembers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrganization = async () => {
      try {
        const res = await ApiCall.get('/organizations');
        setOrganization(res.data[0]);
      } catch (error) {
        setOrganization(
          {
            organization: {
              welcomeText: 'Vaya, parece que no se han podido recuperar algunos datos'
            },
            members: [],
            testimonials: []
          }
        )
      }
    }

    const getMembers = async () => {
      try {
        const res = await ApiCall.get('/members');
        const lastMembers = res.data.reverse();
        const recortedMembers = lastMembers.slice(0, 4)
        setMembers(recortedMembers)
      } catch (error) {
        setMembers([])
      } finally {
        setTimeout(function () {
          setLoading(false)
        }, 1000);
      }
    }

    const getTestimonials = async () => {
      try {
        const res = await ApiCall.get('/testimonials');
        const lastTestimonials = res.data.reverse();
        const recortedTestimonials = lastTestimonials.slice(0, 4)
        setTestimonials(recortedTestimonials)
      } catch (error) {
        setTestimonials([])
      } finally {
        setTimeout(function () {
          setLoading(false)
        }, 1000);
      }
    }

    const getNews = async () => {
      try {
        const res = await ApiCall.get('/news');
        const lastData = res.data.reverse()
        const recortedNews = lastData.slice(0, 2)
        setNews(recortedNews)
      } catch (error) {
        setNews([])
      } finally {
        setTimeout(function () {
          setLoading(false)
        }, 1000);
      }
    }
    getOrganization();
    getMembers();
    getTestimonials();
    getNews();
  }, []);

  
  return (
    <div className="flex flex-col items-center w-screen">
      {JSON.stringify(organization) !== '{}' ? (
        <>
          <div className="p-12 lg:mx-28 w-full">
            <div className="flex flex-col-reverse md:grid grid-cols-2 gap-6 justify-center">
              <div className="flex flex-col justify-between gap-4 m-auto">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-center md:text-start mb-6">Hola! Bienvenidx</h1>
                  <p className="w-6/7 mr-auto ml-auto md:ml-0">{organization.welcomeText}</p>
                </div>
                <Button route='/contacts' buttonName='Contactanos' styles='formButton' />
              </div>
              <img className="w-96 h-60  sm:w-full sm:h-80 md:w-full md:h-80 rounded-2xl m-auto object-cover" src={image} alt="Roberto Martinez" />
            </div>
          </div>

          <Slider />
          <LastDataLayout route='/nosotros' title='Nuestro staff'>
            <DataList data={members} loading={loading} type='member' title='miembros' />
          </LastDataLayout>

          <LastDataLayout route='/testimonials' title='Ultimos testimonios'>
            <DataList data={testimonials} loading={loading} type='testimonial' title='testimonios' />
          </LastDataLayout>

          <LastDataLayout route='/news' title='Ultimas novedades'>
            <DataList data={news} loading={loading} type='new' title='novedades' />
          </LastDataLayout>
        </>
      ) : (
        <Loader />
      )
      }
    </div>
  )
};


export default Home;
