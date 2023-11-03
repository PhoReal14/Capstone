import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { RegisterANewUser } from '../apiCalls/utils';

export default function Register() {
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [newEmail, setNewEmail] = useState('')
const navigation = useNavigate()

// functions useForm will use to handle form validation
const { register, handleSubmit, watch, formState: { errors } } = useForm({
  mode: 'onBlur'
})

const registerNewUser = async (data) => {
console.log('Passed data:', data)
  // need to change the function to call the api
  try{
    const response = await RegisterANewUser({
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
            <input type='password' {...register('newPassword', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Minimum length not yet met (8)'
              }
            })} onChange={(e) => setNewPassword(e.target.value)} placeholder="password" id='newPassword'/>
          </label>
          {errors.newPassword && <p>{errors.newPassword?.message}</p>}
          <br></br><br></br>
          <label htmlFor='samePassword'>ReEnter Password:
            <input type='password' {...register('samePassword', {
              validate: (value) => value === watch('newPassword') || 'Passwords must match', minLength: {
                value: 8,
                message: 'Minimum not yet met (8)'
              }})} placeholder="repeat password" id='samePassword'/>
          </label>
          {errors.samePassword && <p>{errors.samePassword?.message}</p>}
          <br></br><br></br>
          {newUsername && newPassword && newEmail.length > 0 ? (
            <button type='submit'>Create Account</button>
          ): <p><FontAwesomeIcon icon={faTriangleExclamation} style={{color: '#fe5858'}} /> Please fill out registration form or</p>}
        </form>
      </div>
      <span>
        <Link to='/'>Return to log in</Link>
      </span>
      </div>
    </div>
  )
}