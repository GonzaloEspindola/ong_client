import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { linksPublic } from '../../data/headerData';
import Logo from '../../images/Logo.png'
import Facebook from '../../images/facebook.png'
import Instagram from '../../images/instagram.png'
import LinkedIn from '../../images/linkedin.png'
import APICalls from '../../shared/APICalls';

const Footer = () => {
  const { pathname } = useLocation();
  const [organization, setOrganization] = useState({});

  useEffect(() => {
    const getOrganization = async () => {
      try {
        const res = await APICalls.get('/organizations');
        setOrganization(res.data[0]);
      } catch (error) {
        setOrganization(
          {
            image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
        )
      }
    }
    getOrganization();
  }, [])

  if(pathname === "/login-user" || pathname === "/register-user")return null

  return (
    <div className='bg-neutral-400 pt-12 pr-4 pb-16 pl-4'>
      <div className="flex flex-col items-center gap-8">
        <div className="image-container">
          <img className="w-24 h-13" src={organization.image} alt='Logo' />
        </div>
        <div className='flex flex-col gap-2.5 mt-7 py-0 px-2.5'>
          <div className="flex justify-center gap-6 align-center">
            <a href={organization.facebook} target='_blank' rel="noreferrer">
              <img className="w-8 h-8 object-contain" src={Facebook} alt='Facebook'/>
            </a>
            <a href={organization.instagram} target='_blank' rel="noreferrer">
              <img className="w-8 h-8 object-contain" src={Instagram} alt='Instagram' />
            </a>
            <a href={organization.linkedin} target='_blank' rel="noreferrer">
              <img className="w-8 h-8 object-contain" src={LinkedIn} alt='LinkedIn' />
            </a>
          </div>
          <p className='text-center'>{`2022 by ${organization.name}. All Rights Reserved.`}</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
