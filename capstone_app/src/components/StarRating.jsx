import { useState } from 'react'
import { FaStar } from 'react-icons/fa'


export default function StarRating({ currRate, currRateColor }) {
  const [rating, setRating] = useState(currRate)
  const [rateColor, setRateColor] = useState(currRateColor)
  
  return(
    <div id='star-rating'>
      {[...Array(5)].map((_, index) => {
        const currentRate = index + 1;
        return (
          <div key={index}>
            <input type='radio' name='rate' value={currentRate} onClick={() => setRating(currentRate)} />
            <FaStar color={currentRate <= (rateColor || rating) ? 'yellow' : 'grey'} />
          </div>
        );
      })}
    </div>
  )
}