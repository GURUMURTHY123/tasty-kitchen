import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const EmptyCartView = () => (
  <div className='empty-cart-view-container'>
    <img src='https://res.cloudinary.com/datzkejai/image/upload/v1694159737/cooking_1_u3quk3.png' alt='empty-cart-view-image' className='empty-cart-view-image' />
    <h1 className='empty-cart-view-heading'>No Orders Yet!</h1>
    <p className='empty-cart-view-description'>Your cart is empty. Add something from the menu.</p>
    <Link to='/' style={{textDecoration:'none'}}><button className='order-button'>Order Now</button></Link>
  </div>
)

export default EmptyCartView