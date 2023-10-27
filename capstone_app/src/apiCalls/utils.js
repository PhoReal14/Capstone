import axios from 'axios'
const BASE_URL = ''
// currently using mock data to pull for products

// register
const RegisterANewUser = async ({ username, password }) => {
  console.log('Info passed to api:', username, password)
  // need to fix this once api is done
  try{
    const res = await axios.post(`${BASE_URL}`)
  }catch(error){
    console.error('Failed to register user:', error)
  }
}

const getAllProducts = async () => {
  try{
    const res = await axios.get('https://fakestoreapi.com/products')
    if(res) {
      // console.log(res)
      return res.data
    }
  }catch(error){
    console.warn('Failed to get all products:', error)
  }
}

export { RegisterANewUser, getAllProducts }