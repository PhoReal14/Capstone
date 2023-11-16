import { useState, createContext, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './comp/Navbar.css'
import ReactSwitch from "react-switch";
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Products';
import Navbar from './comp/Navbar';
import Contact from './components/Contact';
import Home from './components/Home';
import About from './components/About';
import Logout from './components/Logout';
import UserInfo from './components/UserInfo';
import { userInfo } from './apiCalls/utils';
import Footer from './components/Footer';

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

  // authenticate routes
  const [isAuth, setIsAuth] = useState(false)
  const username = sessionStorage.getItem('username')
  
  useEffect(() => {
    const setAuthUser = async () => {
      if(username === null) {
        setIsAuth(false)
      } else {
        setIsAuth(true)
      }
    }
    setAuthUser()
  }, [])

  // get users info id
  const [info, setInfo] = useState([])
  // save all user data
  const [allInfo, setAllInfo] = useState([])
  useEffect(() => {
    const getInfo = async () => {
      try{
        const res = await userInfo()
        if(res !== undefined) {
          setInfo(res.data)
          setAllInfo(res)
        } else {
          console.info('User isn\'t signed in')
        }
      } catch(error) {
        console.warn('Unable to get users info', error.message)
      }
    }
    getInfo()
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, themeToggle}}>
      <div id={ theme } >
        <div id='navbar'>
          <Navbar isAuth={isAuth} info={info} />
        </div>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/home' element={<Home info={info} isAuth={isAuth} username={username} />} />
          <Route path='/userinfo' element={<UserInfo info={info} />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Products />} />
          <Route path='*' element={<Products />} />
        </Routes>
        <div id='switch'>
        <label> {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
          <ReactSwitch onChange={themeToggle} checked={theme === 'dark'}/>
        </label>
      </div>
      <div id='footer-div'>
        <Footer />
      </div>
      </div>
      <ToastContainer theme='dark' position='bottom-center' autoClose={1500} pauseOnFocusLoss={false} />
    </ThemeContext.Provider>
  )
}

export default App
