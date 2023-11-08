import { useState, useEffect } from "react"
import { getAllProducts } from "../apiCalls/utils"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StarRating from "./StarRating"
import { AiOutlineSearch } from "react-icons/ai"

export default function Products() {
  const [products, setProducts] = useState([])
  const [productRating, setProductRating] = useState([])
  const [electronics, setElectronics] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams]  = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try{
        const response = await getAllProducts()
        console.log('all products:', response)
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

 
  // useEffect(() => {
  //   if(products.length > 0) {
  //     const items = products.filter((x) => {
  //       return x.category == 'electronics'
  //     })
  //     // console.log(items)
  //     setElectronics(items)
  //   }
  // }, [products])

  // useEffect(() => {
  //   const getProductRatings = async () => {
  //     products.map((x) => (setProductRating(x.rating.rate)))
  //   }
  //   getProductRatings()
  // }, [])
  
  // console.log('Rating:', productRating)

  // toggle product details
  const [toggleDetails, setToggleDetails] = useState(null)

  const [addedToCart, setAddedToCart] = useState(false)
  const addToCart = async () => {
    setAddedToCart(true)
    toast.success('Added to cart!')
    setTimeout(() => {
      window.location.reload(false)
    }, 3300);
  }
  
  const productsToDisplay = searchParams
    ? products.filter((item) => {
        const itemInfo = `${item.name} ${item.id} ${item.price} ${item.description} ${item.category}`;
        return itemInfo.toLowerCase().includes(searchParams);
    })
  : products;
  



  return(
    <div  className='app'>
      <div id="component">
      <h1>View our products!</h1>
      <div id="search">
        <input 
          id="search_box"
          type="text" 
          placeholder="Search Products" 
          onChange={(e) => setSearchParams(e.target.value.toLowerCase())}/>
      </div>
      <div id="products">
        {productsToDisplay.map((item) => (
          <div key={item.id} className="single-item">
            <p>{item.name}</p>
            <img id="product-img" src={item.imgurl}></img>
            <p><strong>Price:</strong> <span id="dollarSign">${item.price}</span></p>
            <button data-id='data-item-id' onClick={() =>
              setToggleDetails(toggleDetails === item.id ? null : item.id)}>
              {toggleDetails === item.id ? 'View Less' : 'View More'}
              </button>
            {toggleDetails === item.id ? (
              <>
                <p><strong>Description:</strong>{item.description}</p>
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