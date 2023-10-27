import { useState, createContext } from 'react'
import { Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import ReactSwitch from "react-switch";
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Products';

export const ThemeContext = createContext(null)

function App() {
  const [count, setCount] = useState(0)

  // theme stuff
  const [theme, setTheme] = useState('dark')

  const themeToggle = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, themeToggle}}>
      <div id={ theme }>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* change below to product page */}
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
