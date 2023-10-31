import React from 'react';
import {MdLocalShipping} from 'react-icons/md';
import {AiOutlineSearch} from 'react-icons/ai';
import {FiLogIn} from 'react-icons/fi';
import {CiLogout, CiUser} from 'react-icons/ci';
import { useAuth0 } from "@auth0/auth0-react";
import {Link, link} from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated  } = useAuth0();
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
          <img src='images/logo.png' alt='logo'></img>
        </div>
        <div className='search_box'>
          <input type='text' value='' placeholder='search'></input>
          <button><AiOutlineSearch/></button>
        </div>
        {
          isAuthenticated ?
          // if user is logged in then logout button
          <div className='user'>
          <div className='icon'>
            <CiLogout/>
          </div>
          <div className='btn'>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>LogOut</button>
          </div>
        </div>
        :
        //login button
        <div className='user'>
        <div className='icon'>
          <FiLogIn/>
        </div>
        <div className='btn'>
        <button onClick={() => loginWithRedirect()}>Log In</button>;
        </div>
      </div>
        }
       </div>
       <div className='last_header'>
        <div className='user_profile'>
          {
           //user profile is shown here 
           isAuthenticated ?
            <>
            <div className='icon'>
              <CiUser/>
            </div>
            <div className='info'>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
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
            <li><Link to='/' className='link'>Home</Link></li>
            <li><Link to='/shop' className='link'>Shop</Link></li>
            <li><Link to='/about' className='link'>About</Link></li>
            <li><Link to='/contact' className='link'>Contact</Link></li>
          </ul>
        </div>
        <div className='Offers'>
          <p>No Offers At This Time</p>
        </div>
       </div>
       </div>
       </>
  )
}

export default Navbar

