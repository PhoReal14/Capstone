import { useState, useEffect } from "react"
import { getAllProducts } from "../apiCalls/utils"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StarRating from "./StarRating"

export default function Products() {
  const [products, setProducts] = useState([])
  const [productRating, setProductRating] = useState([])
  const [electronics, setElectronics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      try{
        const response = await getAllProducts()
        // console.log('all products:', response)
        if(response) {
          setProducts(response)
          setLoading(false)
        }
        
      }catch(error){
        console.warn('Error on front end:', error)
      }
    }
    if(products.length === 0) {
      getProducts()
    }
  }, [products])

 
  useEffect(() => {
    if(products.length > 0) {
      const items = products.filter((x) => {
        return x.category == 'electronics'
      })
      // console.log(items)
      setElectronics(items)
    }
  }, [products])

  // useEffect(() => {
  //   const getProductRatings = async () => {
  //     products.map((x) => (setProductRating(x.rating.rate)))
  //   }
  //   getProductRatings()
  // }, [])
  
  // console.log('Rating:', productRating)

  // toggle product details
  const [toggleDetails, setToggleDetails] = useState(false)

  const [addedToCart, setAddedToCart] = useState(false)
  const addToCart = async () => {
    setAddedToCart(true)
    toast.success('Added to cart!')
    setTimeout(() => {
      window.location.reload(false)
    }, 3300);
  }


  return(
    <div  className='app'>
      <div id="component">
      <h1>View our products!</h1>
      <div id="products">
        {electronics.map((item) => (
          <div key={item.id} className="single-item">
            <p>{item.title}</p>
            <img id="product-img" src={item.image}></img>
            <p><strong>Price:</strong> <span id="dollarSign">${item.price}</span></p>
            <button data-id='data-item-id' onClick={() => {
              setToggleDetails((prev) => (prev === item.id ? null : item.id))
            }}>{toggleDetails ? 'View Less' : 'View More'}</button>
            {toggleDetails === item.id ? (
              <>
                <p><strong>Description:</strong>{item.description}</p>
                <p><strong>Product Rating: </strong>{item.rating.rate}</p>
                <span>
                  <button onClick={addToCart}>Add to cart</button>
                </span>
              </>
            ):null}
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}