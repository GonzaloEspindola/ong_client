import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Public from "./pages/Public/Public.js";
import Backoffice from "./pages/Backoffice/Backoffice.js";
import { UserProvider } from "./context/UserProvider.js";
import { Provider } from "react-redux";
import store from './app/store';
import PrivateRoute from "./Components/PrivateRouter/PrivateRouter.js";
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <UserProvider>
            <div className="flex flex-col min-h-screen">
              <Routes>
                  <Route path='/*' element={<Public />}/>
                  <Route element={<PrivateRoute allowedRoles={["2"]}/>}>
                    <Route path='/backoffice/*' element={<Backoffice />}/>
                  </Route>
                  <Route element={<PrivateRoute allowedRoles={["1", "2"]}/>}>
                    <Route path='/me' element={<Profile />}/>
                  </Route>
              </Routes>
            </div>
          </UserProvider>
        </Provider>
      </Router>
    </>
  );
}

export default App;
