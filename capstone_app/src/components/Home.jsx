import { Sling as Menu } from 'hamburger-react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'

export default function Home({ isAuth, username, info }) {
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      if(isAuth === true) {
        setLoading(false)
    }
  }, [isAuth])

  // users timezone greeting
  const timezoneGreeting = () => {
    const now = new Date()
    const hours = now.getHours()

    if(hours >= 5 && hours < 12) {
      return 'Good morning'
    } else if(hours >= 12 && hours < 17) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }
  const greetings = timezoneGreeting()

  // for modal popup
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return(
    <div className="app">
      <div id="component">
        <h1>ByteMarket</h1>
        { isAuth === true && !loading ? (
          <>
          <h4>{greetings}, {username}</h4>
          <div id='hamburger'>
          <Menu toggled={isOpen} toggle={setOpen} />
              {isOpen ? (
                <div id='menu'>
                <Link to='/userinfo'>Update shipping info</Link>
                <Link onClick={openModal}>My profile info</Link>
                <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel='User profile modal' style={customStyles}>
                  <div>
                  <h2>Profile information</h2>
                      <div key={info.user.id}>
                        <div>
                          <p>Username: {info.user.username}</p>
                          <p>Email: {info.user.email}</p>
                        </div>
                        {info.userShipmentInfo.length > 0 ? (
                          <div key={info.userShipmentInfo[0].id}>
                          <p>First name: {info.userShipmentInfo[0].first_name}</p>
                          <p>Last name: {info.userShipmentInfo[0].last_name}</p>
                          <p>Address: {info.userShipmentInfo[0].address}</p>
                        </div>
                        ): <p>Please update your shipping info</p>}
                      </div>
                  </div>
                </Modal>
                <Link to='/firstlink'>First extra link</Link>
                <Link to='/secondlink'>Second extra link</Link>
                </div>
              ):null}
          </div>
          </>
        ): (
          <div>
            <FontAwesomeIcon id='spin' icon={faSpinner} />
          </div>
        )}
      </div>
    </div>
  )
}

Modal.setAppElement('#modal')