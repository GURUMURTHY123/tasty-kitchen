import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import SpecificRestaurantDetails from './components/SpecificRestaurantDetails'
import Cart from './components/Cart'
import CartContext from './CartContext.js'
import PageNotFound from './components/PageNotFound'
import PaymentSuccess from './components/PaymentSuccess'
import './style.css';

let cartData = JSON.parse(localStorage.getItem('cartData'))
if(cartData===null){
  cartData = []
}

class App extends Component{

  state = {cartList:cartData}

  addCartItem = async product => {
    const {cartList} = this.state
    const isPresent = cartList.filter(eachItem=>(eachItem.id===product.id))
    isPresent.length===0 ? await this.setState({cartList:[...cartList, product]}): await this.increaseCartItemQuantity(product.id)
  }

  deleteCartListItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem=>(eachItem.id!==id))
    this.setState({cartList:updatedCartList})
  }

  increaseCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachCartItem=>{
      if(eachCartItem.id===id){
        return {...eachCartItem, quantity:eachCartItem.quantity+1}
      }
      return eachCartItem
    })
    this.setState({cartList:updatedCartList})
  } 

  decreaseCartItemQuantity = async id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachCartItem=>{
      if(eachCartItem.id===id){
        if(eachCartItem.quantity!==1){
          return {...eachCartItem, quantity:(eachCartItem.quantity-1)}
        }
      }
      return eachCartItem
    })
    this.setState({cartList:updatedCartList})
  }

  render(){
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <CartContext.Provider value={{cartList,
        deleteCartListItem:this.deleteCartListItem,
        addCartItem:this.addCartItem,
        decreaseCartItemQuantity:this.decreaseCartItemQuantity,
        increaseCartItemQuantity:this.increaseCartItemQuantity}}>
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/restaurants-list/:restrauntId" component={SpecificRestaurantDetails} />
            <ProtectedRoute exact path='/cart' component={Cart} />
            <Route exact path='/page-not-found' component={PageNotFound} />
            <ProtectedRoute exact path='/success' component={PaymentSuccess} />
            <Redirect to='/page-not-found' />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App