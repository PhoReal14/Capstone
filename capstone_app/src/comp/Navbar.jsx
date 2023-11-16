import React from 'react';
import {MdLocalShipping} from 'react-icons/md';
import {FiLogIn} from 'react-icons/fi';
import {CiLogout, CiUser} from 'react-icons/ci';
import {Link} from 'react-router-dom';
import './Navbar.css';
import { useState, useEffect } from 'react';


const Navbar = ({ isAuth, info }) => {
  const [data, setData] = useState([])
  const username = sessionStorage.getItem('username')
  useEffect(() => {
    if(info.user){
      setData(info.user)
    } 
  }, [])
 
  return(
    <>
    <div className='header'>
      <div className='top_header'>
        <div className='icon'>
        <MdLocalShipping/>
        </div>
        <div className='info'>
          <p>Get 20% off with code cool</p>
        </div>
      </div>
      <div className='mid_header'>
        <div className='logo'>
          <img src='images/bytemarket.png' alt='logo'></img>
        </div>
        {
          isAuth ?
          // if user is logged in then logout button
          <div className='user'>
          <div className='icon'>
            <CiLogout/>
          </div>
          <div className='btn'>
          <a href='/logout'><button>LogOut</button></a>
          </div>
        </div>
        :
        //login button
        <div className='user'>
        <div className='icon'>
          <FiLogIn/>
        </div>
        <div className='btn'>
        <a href='/login'><button>Log In</button></a>
        </div>
      </div>
        }
       </div>
       <div className='last_header'>
        <div className='user_profile'>
          {
           //user profile is shown here 
           isAuth ?
            <>
            <div className='icon'>
              <CiUser/>
            </div>
            <div className='info'>
            <p>{username}</p>
            <p>{data.email}</p>
            </div>
            </>
            :
            <>
               <div className='icon'>
              <CiUser/>
            </div>
            <div className='info'>
              <p>Please Login</p>
            </div>
            </>
          }
        </div>
        <div className='nav'>
          <ul>
            <li><Link to='/home' className='link'>Home</Link></li>
            <li><Link to='/' className='link'>Shop</Link></li>
            <li><Link to='/about' className='link'>About</Link></li>
            <li><Link to='/contact' className='link'>Contact</Link></li>
          </ul>
        </div>
        <div className='Offers'>
          <p>Code: cool</p>
        </div>
       </div>
       </div>
       </>
  )
}

export default Navbar