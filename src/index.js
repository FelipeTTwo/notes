import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from './context/UserProvider';
import Login from './routes/Login';
import Register from './routes/Register';
import Auth from "./components/Auth";
import Notes from './components/Notes';
import Archived from "./components/Archived"
import Dashboard from './routes/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< App />}>
            <Route index element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/dashboard" element={<Auth> <Dashboard /> </Auth>} >
              <Route index element={<Notes />} />
              <Route path='/dashboard/archived' element={<Archived />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>

  </React.StrictMode>
);


