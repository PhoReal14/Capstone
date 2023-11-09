import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userLogin } from '../apiCalls/utils';

export default function Login () {
  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  const navigation = useNavigate()

  const {register, handleSubmit, formState: { errors }} = useForm()

  const handleLogin = async (data) => {
    try{
      const login = await userLogin({
        username: data.username,
        password: data.pwd
      })
      if(login){
        toast.success(`Glad to have you back ${data.username}!`)
        sessionStorage.setItem('username', data.username)
        sessionStorage.setItem('token', login.token)
        setTimeout(() => {
          navigation('/home')
          window.location.reload(false)
        }, 1400);
      }
    } catch(error) {
      console.warn('Login failed:', error)
      toast.warn('Username or password is incorrect.')
    }
  }

  return(
    <div  className='app'>
      <div id='component'>
      <h1>ByteMarket</h1>
      <h3>Log in below</h3>
      <div id='login-form'>
        <form onSubmit={handleSubmit(handleLogin)}>
          <label htmlFor='username'>Username:
            <input {...register('username', {
              required: 'Username is required for login'
            })} autoComplete='off' id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
          </label>
          {errors.username && <p>{errors.username?.message}</p>}
          <br></br><br></br>
          <label htmlFor='pwd'>Password:
            <input {...register('pwd', {
              required: 'Password is required for login'
            })} autoComplete='off' id='pwd' type='password' value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder='password'/>
          </label>
          {errors.pwd && <p>{errors.pwd?.message}</p>}
          <br></br><br></br>
          <button>Login</button>
        </form>
        <span id='registerLink'>
          <Link to='/register'>Not registered? Go here to create an account</Link>
        </span>
      </div>
      </div>
    </div>
  )
}