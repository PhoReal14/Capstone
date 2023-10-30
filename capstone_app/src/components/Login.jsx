import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login () {
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const navigation = useNavigate()

  return(
    <div  className='app'>
      <div id='component'>
      <h1>Log in below</h1>
      <div id='login-form'>
        <form>
          <label htmlFor='username'>Username:
            <input autoComplete='off' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
          </label>
          <br></br><br></br>
          <label htmlFor='password'>Password:
            <input autoComplete='off' id='password' type='password' value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder='password'/>
          </label>
          <br></br><br></br>
          <button type='submit'>Login</button>
        </form>
        <span id='registerLink'>
          <Link to='/register'>Not registered? Go here to create an account</Link>
        </span>
      </div>
      </div>
    </div>
  )
}