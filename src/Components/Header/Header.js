import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../images/Logo.png'
import { useUserContext } from '../../context/UserProvider';
import { linksPublic, linksLoguedUser } from '../../data/headerData';
import Button from '../Buttons/Buttons';
import APICalls from '../../shared/APICalls';

const Header = () => {
  const [ links, setLinks ] = useState([]);
  const { user, setUser } = useUserContext();
  const [organization, setOrganization] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    user ? setLinks(linksLoguedUser) : setLinks(linksPublic)
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
  }, [user])

  const handleToggleUser = (setUser, user) => {
    sessionStorage.removeItem('token');
    setUser(null);
  }

    return (
      <div className="bg-slate-100 px-5 py-4 shadow-md shadow-gray-400">
        <div className="h-full flex justify-between items-center">
          <div className="image-container justify-center items-center cursor-pointer hidden sm:flex" onClick={() => navigate('/')}>
            <img className=" w-14 h-9 md:h-11 object-contain" src={organization.image} alt='Logo' />
            <h1 className='font-bold text-lg'>{organization.name}</h1>
          </div>
          <div className="flex align-center gap-5 justify-between">
            <ul className="gap-4 items-center hidden md:flex">
              {links.map((link) => (
                <NavLink to={`${link.route}`} style={({ isActive }) => (isActive ? { fontWeight: 'bold' } : { fontWeight: 'initial' })} key={link.id} className="text-sm">
                  {link.title}
                </NavLink>
              ))}
            </ul>
            <div className="flex gap-2">
              {user?.roleId === "2" && (
                  <Button route='/backoffice' buttonName='Backoffice' styles='primaryButton' />
              )}
              {user?.roleId === "1" && (
                  <Button route='/me' buttonName='Perfil' styles='primaryButton' />
              )}
              {user?.roleId === "2" && (
                  <Button route='/me' buttonName='Perfil' styles='primaryButton' />
              )}
              {user ? (
                <>
                  <Button route='/' buttonName='Cerrar sesion' styles='secondaryButton' handler={() => handleToggleUser(setUser, user)}/>
                </>
              ) : (
                <>
                  <Button route='/login-user' buttonName='Inicia sesion' styles='primaryButton' />
                  <Button route='/register-user' buttonName='Registrate' styles='secondaryButton' />
                </>
              )
              }
            </div>
          </div>
        </div>
      </div >
    ) 
  }

export default Header;