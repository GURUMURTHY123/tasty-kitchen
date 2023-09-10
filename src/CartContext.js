import React from 'react'

const CartContext = React.createContext({
  cartList:[],
  addCartItem:() => {},
  deleteCartListItem:() => {},
  increaseCartItemQuantity:() => {},
  decreaseCartItemQuantity:() => {}
})

export default CartContext