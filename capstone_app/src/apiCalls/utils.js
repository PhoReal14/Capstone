import axios from 'axios'
const BASE_URL = 'http://localhost:4000/api'

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
  console.log('Making sure info passed to api:', username, password)
  try{
    const response = await axios.post(`${BASE_URL}/users/login`, {
      username,
      password
    })
    return response
  } catch(error) {
    console.error('Failed to login:', error)
  }
}

// user info
const userInfo = async () => {
  try{
    const response = await axios.get(`${BASE_URL}`)
    if(response) {
      console.log(response)
    }
  } catch(error) {
    console.warn('Failed to get user\'s info:', error)
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

export { RegisterANewUser, getAllProducts, userLogin, userInfo }