import React from 'react'
import {MdOutlineDeleteOutline} from 'react-icons/md'
import './index.css'

const CartItem = props => {
  const {itemList, increaseCartItemQuantity, decreaseCartItemQuantity, deleteCartListItem} = props

  const onClickIncrementButton = () => {
    increaseCartItemQuantity(itemList.id)
  }

  const onClickDecrementButton = () => {
    decreaseCartItemQuantity(itemList.id)
  }

  const onClickDeleteIcon = () => {
    deleteCartListItem(itemList.id)
  }

  return(
    <>
      <li key={itemList.id} className='cart-item-container'>
        <div className='cart-item-image-container'>
          <img src={itemList.imageUrl} className='cart-item-image' />
          <p className='cart-item-name'>{itemList.name}</p>
        </div>
        <div className='item-add-subtract-container'>
          <button className='item-quantity-button' onClick={onClickDecrementButton}>-</button>
          <p className='cart-item-quantity'>{itemList.quantity}</p>
          <button className='item-quantity-button' onClick={onClickIncrementButton}>+</button>
        </div>
        <p className='cart-item-cost'>Rs. {(itemList.quantity) * (itemList.cost)}</p>
        <MdOutlineDeleteOutline size='26px' onClick={onClickDeleteIcon} />
      </li>
      <li key={`mobile-${itemList.id}`} className='mobile-cart-item-container'>
        <img src={itemList.imageUrl} className='cart-item-image' />
        <div className='cart-description-container'>
          <p className='cart-item-name'>{itemList.name}</p>
          <div className='item-add-subtract-container'>
            <button className='item-quantity-button' onClick={onClickDecrementButton}>-</button>
            <p className='cart-item-quantity'>{itemList.quantity}</p>
            <button className='item-quantity-button' onClick={onClickIncrementButton}>+</button>
          </div>
          <p className='cart-item-cost'>Rs. {(itemList.quantity) * (itemList.cost)}</p>
        </div>
        <MdOutlineDeleteOutline size='26px' onClick={onClickDeleteIcon} className='delete-button' />
    </li>
    </>
  )
}

export default CartItem