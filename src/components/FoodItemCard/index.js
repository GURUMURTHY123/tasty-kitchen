import React from 'react'
import {AiFillStar} from 'react-icons/ai'
import CartContext from '../../CartContext.js'
import './index.css'

const FoodItemCard = props => {
  const {foodItemDetails, isFoodItemClicked, decreaseQuantity, increaseQuantity} = props

  return(
    <CartContext.Consumer>
      {value=>{
        const {cartList, addCartItem, deleteCartItem, increaseCartItemQuantity, decreaseCartItemQuantity} = value

        const onClickAddBtn = async () => {
          await isFoodItemClicked(foodItemDetails.id)
          await addCartItem(foodItemDetails)
        }
      
        const onClickDecrement = async () => {
          await decreaseQuantity(foodItemDetails.id)
          await decreaseCartItemQuantity(foodItemDetails.id)
        }
      
        const onClickIncrement = async () => {
          await increaseQuantity(foodItemDetails.id)
          await increaseCartItemQuantity(foodItemDetails.id)
        }

        return (<div className='food-item-card'>
            <img src={foodItemDetails.imageUrl} className='food-card-image' />
            <div className='food-card-detail'>
              <h2 className='food-card-heading'>{foodItemDetails.name}</h2>
              <p className='food-item-cost'>{foodItemDetails.cost} Rs</p>
              <div className='food-card-rating-container'>
                <AiFillStar style={{color:'#FFCC00'}} /> 
                <p className='food-item-rating'>{foodItemDetails.rating}</p>
              </div>
              {(foodItemDetails.isClicked===false)?<button className='add-btn' onClick={onClickAddBtn}>Add</button>:(
                <div className='add-subtract-container'>
                  <button className='quantity-button' onClick={onClickDecrement}>-</button>
                  <p className='item-quantity'>{foodItemDetails.quantity}</p>
                  <button className='quantity-button' onClick={onClickIncrement}>+</button>
                </div>
              )}
            </div>
          </div>)}}
    </CartContext.Consumer>
  )
}

export default FoodItemCard