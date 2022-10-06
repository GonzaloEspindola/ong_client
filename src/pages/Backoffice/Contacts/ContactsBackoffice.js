import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Table from '../../../Components/Table/Table'
import contactsAPI from '../../../shared/APICalls';
import BackofficeForm from '../../../Components/DynamicForm/BackofficeForm';

const ContactsBackoffice = () => {
  const [ contacts, setContacts ] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            const res = await contactsAPI.get('/contacts')
            setContacts(res.data)
        }
        getContacts();
    }, []);

  return (
    <Routes>
      <Route path='/' element={
          <>
            <Table
              title='Contactos'
              tableHeader={['Name', 'Phone', 'Email', 'Mensaje']}
              tableData={contacts}
              requiredProperties={['name', 'email', 'phone', 'message', 'createdAt']}
              buttons={[
              ]}
            />
        </>
      } />
      <Route path='/edit' element={<BackofficeForm/>} />
    </Routes>
  )
}

export default ContactsBackoffice