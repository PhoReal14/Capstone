
import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
 <>
 <div className='home'>
  <div className='top_banner'>
    <div className='contant'>
      <h3>The Best Tech Deals</h3>
      <h2>Shop Computer Parts Now</h2>
      <p>Get 20% Off Your First Order</p>
      <Link to='/shop' className='link'>Shop Now</Link>
    </div>
  </div>
  <div className='trending'>
    <div className='container'>
      <div className='left_box'>
        <div className='header'>
          <div className='heading'>
            <h2>Trending Product</h2>
            </div>
            <div className='cate'>
              <h3>New</h3>
              <h3>Featured</h3>
            </div>
           </div>
           <div className='product'>
            <div className='container'>
              
            </div>
           </div>
         </div>
        </div>
        </div>
        <div className='right_box'>
        </div>
        </div>
        
 </>
  )
}

export default Home
