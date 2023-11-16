import axios from 'axios'
const BASE_URL = 'http://localhost:4000/api'

const token = sessionStorage.getItem('token')

// register
const RegisterANewUser = async ({ username, password, email }) => {  
  try{
    const res = await axios.post(`${BASE_URL}/users/register`, {
      username,
      password,
      email
    })
    return res
  }catch(error){
    console.error('Failed to register user:', error)
  }
}

// login
const userLogin = async ({ username, password }) => {
  try{
    const response = await axios.post(`${BASE_URL}/users/login`, {
      username,
      password
    })
    return response.data
  } catch(error) {
    console.error('Failed to login:', error)
  }
}

// update user address info
const updateShipmentInfo = async ({ user_id, first_name, last_name, address }) => {
  console.log('Passed to api:', user_id, first_name, last_name, address)
  try{
    const response = await axios.post(`${BASE_URL}/users/me`,{
      user_id,
      first_name,
      last_name,
      address,
    },
    {
    headers: {
      'Authorization': `Bearer ${token}`,
    }})
    if(response){
      return response
    }
  }catch(error){
    console.warn('Failed to update user shipment information:', error)
  }
}

// user info
const userInfo = async () => {
  try{
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    if(response) {
      return response
    }
  } catch(error) {
    if(error.response && error.response.status === 500) {
      console.info('User is not logged in')
    } else {
      console.warn('Failed to get user\'s info:', error.message)
    }
  }
}

const getAllProducts = async () => {
  try{
    const res = await axios.get(`${BASE_URL}/products`)
    if(res) {
      return res.data
    }
  }catch(error){
    console.warn('Failed to get all products:', error)
  }
}

const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, productData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Failed to create product:', error);
  }
};

export { RegisterANewUser, getAllProducts, userLogin, userInfo, updateShipmentInfo, createProduct}