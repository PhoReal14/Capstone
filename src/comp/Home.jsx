import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
   <>
   <div className='home'>
    <div className='top_banner'>
        <div className='content'>
            <h3>Get 20% off your first purchase</h3>
            <h2></h2>
            <p></p>
            <Link to='/shop' className='link' >Shop Now </Link>
        </div>

    </div>
   </div>
   </>
  )
}

export default Home
