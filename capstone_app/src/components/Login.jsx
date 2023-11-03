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
  // need to see if login works, remember to implement authorization routes and customize profile page based on if user has already added their shipping info, and if user has 'applied' to be a seller then make the addproduct component available to them via their homepage

  const {register, handleSubmit, formState: { errors }} = useForm()

  const handleLogin = async (data) => {
    try{
      const login = await userLogin({
        username: data.username,
        password: data.pwd
      })
      if(login){
        toast.success('You\'re logged in!')
        sessionStorage.setItem('username', data.username)
        setTimeout(() => {
          navigation('/home')
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
      <h1>Log in below</h1>
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