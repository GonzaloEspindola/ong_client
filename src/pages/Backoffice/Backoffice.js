import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from '../../Components/Footer/Footer';
import TestimonialsBackoffice from "./Testimonials/TestimonialsBackoffice";
import ContactsBackoffice from './Contacts/ContactsBackoffice'
import NewsBackoffice from "./News/NewsBackoffice";
import HomeBackoffice from "./Home/HomeBackoffice";
import BackofficeLayout from "./Layout/BackofficeLayout";
import Slides from "./Slides/Slides";
import MembersBackoffice from './Members/MembersBackoffice';
import UsersBackoffice from './Users/UsersBackoffice';
import BackofficeHeader from "../../Components/BackofficeHeader/BackofficeHeader";

const Private = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col flex-grow justify-center">
                <BackofficeHeader />
                <Routes>
                    <Route path="/" element={<BackofficeLayout/>} />
                    <Route path="/testimonials/*" element={<TestimonialsBackoffice />} />
                    <Route path="/contacts/*" element={<ContactsBackoffice />} />
                    <Route path="/news/*" element={<NewsBackoffice />} />
                    <Route path="/organization" element={<HomeBackoffice />} />
                    <Route path="/slides/*" element={<Slides />} />
                    <Route path="/members/*" element={<MembersBackoffice />} /> 
                    <Route path='/users/*' element={<UsersBackoffice />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default Private;