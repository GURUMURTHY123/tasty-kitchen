import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import CartContext from '../../CartContext.js'
import CartItem from '../CartItem'
import EmptyCartView from '../EmptyCartView'
import {Link} from 'react-router-dom'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value=>{
      const {cartList, increaseCartItemQuantity, decreaseCartItemQuantity, deleteCartListItem} = value

      const getTotalPrice = () => {
        let totalPrice = 0
        cartList.map(eachItem=>{
          totalPrice += (eachItem.quantity * eachItem.cost)
        })
        return totalPrice
      }

      return(
        <div>
          <Header active='Cart' />
          {cartList.length===0 ? <EmptyCartView /> : (
            <>
              <ul className='cart-list-container'>
                <li className='list-header' key='list-header'>
                  <span className='item-header'>Item</span>
                  <span className='quantity-header'>Quantity</span>
                  <span>Price</span>
                </li>
                {cartList.map(eachList=>(
                  <CartItem itemList={eachList} increaseCartItemQuantity={increaseCartItemQuantity} decreaseCartItemQuantity={decreaseCartItemQuantity} deleteCartListItem={deleteCartListItem} />
                ))}
                <hr className='total-separator' />
                <li className='order-container' key='order-container'>
                  <p className='order'>Order Total :</p>
                  <p className='order-total'>Rs. {getTotalPrice()}</p>
                </li>
                <Link to='/success' style={{textDecoration:'none'}}>
                  <li style={{textAlign:'right'}} key='place-order-button'>
                    <button className='place-order-btn'>Place Order</button>
                  </li>
                </Link>
              </ul>
              <Footer />
            </>)}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart