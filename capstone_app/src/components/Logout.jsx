import { useNavigate, Link } from "react-router-dom"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function Logout() {
  const navigation = useNavigate()
  const savedUsername = sessionStorage.getItem('username')
  

  const loggingOut = () => {
    toast.success(`See you later, ${savedUsername}!`)
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    setTimeout(() => {
      navigation('/')
      window.location.reload(false)
    }, 1500)
  }

  return(
    <div className="app">
      <div id="component">
      <div id="logoutContainer">
      {savedUsername ? (
        <span>
        <h2>Sure you want to log out?</h2>
        <button onClick={loggingOut}>Logout</button>
      </span>
      ) : (
        <>
          <h2>You're already logged out!</h2>
          <span id="logoutLink"><Link to='/'>Click here to sign in!</Link></span>
        </>
      )}
    </div>
      </div>
    </div>
  )
}