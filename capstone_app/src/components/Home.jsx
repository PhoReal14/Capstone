import { Sling as Menu } from 'hamburger-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home({ isAuth }) {
  const [isOpen, setOpen] = useState(false)

  return(
    <div className="app">
      <div id="component">
        <h1>Homepage</h1>
        { isAuth === true ? (
          <>
          <h4>Logged in</h4>
          <div id='hamburger'>
          <Menu toggled={isOpen} toggle={setOpen} />
              {isOpen ? (
                <div id='menu'>
                <Link to='/addproduct'>Add product here</Link>
                <Link to='/addproduct'>Extra</Link>
                <Link to='/addproduct'>Another extra</Link>
                </div>
              ):null}
          </div>
          </>
        ): <h3>Not logged in</h3>}
      </div>
    </div>
  )
}