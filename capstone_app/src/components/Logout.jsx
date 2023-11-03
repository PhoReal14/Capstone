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
    }, 1000)
  }

  return(
    <div id="logoutContainer">
      {savedUsername ? (
        <span>
        <p>Sure you want to log out?</p>
        <button onClick={loggingOut} id="logout-btn">Logout</button>
      </span>
      ) : (
        <>
          <h2>You're already logged out!</h2>
          <span id="logoutLink"><Link to='/'>Click here to sign in!</Link></span>
        </>
      )}
    </div>
  )
}