import { useState, createContext, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import ReactSwitch from "react-switch";
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Products';
import AddProducts from './components/AddProducts';

export const ThemeContext = createContext(null)

function App() {
  // theme stuff
  const defaultTheme = sessionStorage.getItem('theme') || 'dark';
  const [theme, setTheme] = useState(defaultTheme)

  const themeToggle = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
  }

  // update theme in sessionStorage
  useEffect(() => {
    sessionStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, themeToggle}}>
      <div id={ theme } >
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addproduct' element={<AddProducts />} />
          <Route path='/' element={<Products />} />
        </Routes>
        <div id='switch'>
        <label> {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
          <ReactSwitch onChange={themeToggle} checked={theme === 'dark'}/>
        </label>
      </div>
      </div>
      <ToastContainer theme='dark' position='bottom-center' autoClose={2000} pauseOnFocusLoss={false} />
    </ThemeContext.Provider>
  )
}

export default App
