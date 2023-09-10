import React from 'react'
import FoodItemCard from '../FoodItemCard'
import './index.css'

const FoodItems = props => {
  const {foodItemsList, isFoodItemClicked, decreaseQuantity, increaseQuantity} = props
  
  return(
    <div className='food-items-container'>
      {
        (foodItemsList !== undefined) ? foodItemsList.map(eachFoodItem=>(
          <FoodItemCard foodItemDetails={eachFoodItem} key={eachFoodItem.id} isFoodItemClicked={isFoodItemClicked} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} />
        )) : null
      }
    </div>
  )
}

export default FoodItems