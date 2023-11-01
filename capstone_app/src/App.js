import React from 'react'
import { BrowserRouter, Outlet } from 'react-router-dom';
import Navbar from './comp/Navbar';
import Rout from './comp/Rout';
const App = () => {
  return (
    <> 
    <BrowserRouter>
    <Navbar />
    <Rout />
    <Outlet/>

   </BrowserRouter>
    </>
  )
}

export default App;
