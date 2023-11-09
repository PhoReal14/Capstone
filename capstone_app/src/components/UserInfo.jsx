import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateShipmentInfo } from '../apiCalls/utils';

export default function UserInfo({ info }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')

  const {register, handleSubmit, formState: { errors }} = useForm()

  const navigation = useNavigate()

  const sendUserAddress = async (data) => {
    try{
      const res = await updateShipmentInfo({
        first_name: data.firstName,
        last_name: data.lastName,
        address: data.address,
        user_id: info.user.id
      })
      if(res) {
        toast.success('Your shipping info has been updated')
        setTimeout(() => {
          navigation('/home')
        }, 1550);
      }
    }catch(error){
      console.warn('Failed to update address:', error)
      toast.warn('Unable to update your address. Please try again.')
    }
  }

  return(
    <div className="app">
      <div id="component">
        <h1>Add address information</h1>
        <div>
          <form onSubmit={handleSubmit(sendUserAddress)}>
            <label htmlFor='firstName'>First name:
              <br></br>
              <input {...register('firstName', {
                required: 'Your first name is required',
                maxLength: {
                  value: 255,
                  message:'Character limit reached (255)'
                }
              })} id='firstName' placeholder='First name' onClick={(e) => setFirstName(e.target.value)} type='text' />
            </label>
            {errors && <p>{errors.firstName?.message}</p>}
            <br></br>
            <label htmlFor='lastName'>Last name:
              <br></br>
              <input {...register('lastName', {
                required: 'Your last name is required',
                maxLength: {
                  value: 255,
                  message:'Character limit reached (255)'
                }
              })} type='text' id='lastName' placeholder='Last name' onClick={(e) => setLastName(e.target.value)} />
            </label>
            {errors && <p>{errors.lastName?.message}</p>}
            <br></br>
            <label htmlFor='address'>Address:
              <br></br>
              <textarea {...register('address', {
                required: 'Your address is required'
              })} id='address' typeof='text' rows={3} placeholder='Address' onClick={(e) => setAddress(e.target.value)} />
            </label>
            {errors && <p>{errors.address?.message}</p>}
            <br></br><br></br>
            <button>Update Info</button>
          </form>
          <a href='/home'><button id='cancelBtn'>Cancel</button></a>
        </div>
      </div>
    </div>
  )
}