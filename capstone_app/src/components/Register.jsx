import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useState } from 'react';


export default function Register() {
// determine if want to add ability to let user add their address here but maybe only doing it in the homepage so api gets called there for filling out that field to use throughout the app or where user can edit an existing address.
// maybe add where user can add card info (fake of course)

const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [newEmail, setNewEmail] = useState('')
const navigation = useNavigate()

// functions useForm will use to handle form validation
const { register, handleSubmit, watch, formState: { errors } } = useForm({
  mode: 'onBlur'
})

const registerNewUser = async (data) => {

  // need to change the function to call the api
  try{
    const response = await newUserFunc({
      username: data.newUsername,
      password: data.newPassword,
      email: data.newEmail
    })
    console.log('Make sure new user info sent:', response)
    if(response) {
      toast.success('Your account has been created! Please log in.')
      setTimeout(() => {
        navigation('/login')
      }, 1200);
    }
  } catch(error) {
    console.warn('Creating new user error:', error)
  }
}


  return(
    <div  className='app'>
      <div id='component'>
      <h1>Register for an account here</h1>
      <div id="form-container">
        <form onSubmit={handleSubmit(registerNewUser)}>
          <label htmlFor='newUsername'>Username:
            <input {...register('newUsername', {
              required: 'Username is required',
              minLength: {
                value: 5,
                message: 'Minimum length not yet met (5)'
              }})} onChange={(e) => setNewUsername(e.target.value)} placeholder="username" id='newUsername'/>
          </label>
          {errors.newUsername && <p>{errors.newUsername?.message}</p>}
          <br></br><br></br>
          <label htmlFor='newEmail'>Email:
            <input {...register('newEmail', {
              required: 'Email is required',
              validate: {
                maxLength: (x) =>
                  x.length <= 50 || 'Email cannot be longer than 50 characters',
                  matchPattern: (x) => 
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(x) || 'Email address must be valid address'
              }
            })} onChange={(e) => setNewEmail(e.target.value)} type='email' placeholder='email' id='newEmail'/>
          </label>
          {errors.newEmail && <p>{errors.newEmail?.message}</p>}
          <br></br><br></br>
          <label htmlFor='newPassword'>Password:
            <input {...register('newPassword', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Minimum length not yet met (8)'
              }
            })} onChange={(e) => setNewPassword(e.target.value)} placeholder="password" id='newPassword'/>
          </label>
          {errors.newPassword && <p>{errors.newPassword?.message}</p>}
          <br></br><br></br>
          <label htmlFor='repeatPassword'>ReEnter Password:
            <input {...register('repeatPassword', {
              validate: (value) => value === watch('newPassword') || 'Passwords must match', minLength: {
                value: 8,
                message: 'Minimum not yet met (8)'
              }})} placeholder="repeat password" id='repeatPassword'/>
          </label>
          {errors.repeatPassword && <p>{errors.repeatPassword?.message}</p>}
          <br></br><br></br>
          <button type='submit'>Create Account</button>
        </form>
      </div>
      <span>
        <Link to='/'>Return to log in</Link>
      </span>
      </div>
    </div>
  )
}