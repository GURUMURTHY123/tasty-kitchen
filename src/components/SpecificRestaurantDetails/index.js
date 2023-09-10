import React,{Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import {AiFillStar} from 'react-icons/ai'
import FoodItems from '../FoodItems'
import Footer from '../Footer'
import {TailSpin} from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import './index.css'

const apiStatusConstants = {
  initial:'INITIAL',
  loading:'LOADING',
  failure:'FAILURE',
  success:'SUCCESS'
}

class SpecificRestaurantDetails extends Component{

  state = {specificRestaurantDetailsList:{},apiStatus:apiStatusConstants.initial}

  isFoodItemClicked = id => {
    const {specificRestaurantDetailsList} = this.state
    const updatedFoodItem = specificRestaurantDetailsList.foodItems.map(eachFoodItem=>{
      if(eachFoodItem.id===id){
        return {...eachFoodItem, isClicked:true}
      }
      return eachFoodItem
    })
    this.setState({specificRestaurantDetailsList:{...specificRestaurantDetailsList,foodItems:updatedFoodItem}})
  }

  increaseQuantity = id => {
    const {specificRestaurantDetailsList} = this.state
    const updatedFoodItemQuantity = specificRestaurantDetailsList.foodItems.map(eachFoodItem=>{
      if(eachFoodItem.id===id){
        return {...eachFoodItem, quantity:(eachFoodItem.quantity+1)}
      }
      return eachFoodItem
    })
    this.setState({specificRestaurantDetailsList:{...specificRestaurantDetailsList,foodItems:updatedFoodItemQuantity}})
  }

  decreaseQuantity = id => {
    const {specificRestaurantDetailsList} = this.state
    const updatedFoodItemQuantity = specificRestaurantDetailsList.foodItems.map(eachFoodItem=>{
      if(eachFoodItem.id===id){
        if(eachFoodItem.quantity===1){
          return {...eachFoodItem, isClicked:false}
        }else{
          return {...eachFoodItem, quantity:(eachFoodItem.quantity-1)}
        }
      }
      return eachFoodItem
    })
    this.setState({specificRestaurantDetailsList:{...specificRestaurantDetailsList,foodItems:updatedFoodItemQuantity}})
  }

  getFormattedDataForFoodItems = foodItems => {
    const formattedFoodItems = foodItems.map(eachFoodItem=>(
      {
        cost:eachFoodItem.cost,
        foodType:eachFoodItem.food_type,
        id:eachFoodItem.id,
        imageUrl:eachFoodItem.image_url,
        name:eachFoodItem.name,
        rating:eachFoodItem.rating,
        isClicked:false,
        quantity:1
      }
    ))
    return formattedFoodItems
  }

  getFormattedData = jsonData => (
    {
      costForTwo:jsonData.cost_for_two,
      cuisine:jsonData.cuisine,
      foodItems:this.getFormattedDataForFoodItems(jsonData.food_items),
      id:jsonData.id,
      imageUrl:jsonData.image_url,
      itemsCount:jsonData.items_count,
      location:jsonData.location,
      name:jsonData.name,
      opensAt:jsonData.opens_at,
      rating:jsonData.rating,
      reviewsCount:jsonData.reviews_count
    }
  )
 
  getSpecificRestaurantDetails = async () => {
    await this.setState({apiStatus:apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {restrauntId} = params
    const url = `https://apis.ccbp.in/restaurants-list/${restrauntId}`
    const options={
      method:'GET',
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${(Cookies.get('jwt_token'))}`
      }
    }
    try{
      const response = await fetch(url, options)
      if(response.ok===true){
        const jsonData = await response.json()
        const formattedData = this.getFormattedData(jsonData)
        this.setState({specificRestaurantDetailsList:formattedData,apiStatus:apiStatusConstants.success})
      }else{
        this.setState({apiStatus:apiStatusConstants.failure})
      }
    }
    catch{
      this.setState({apiStatus:apiStatusConstants.failure})
    }
  }

  loadingView = () => (
    <TailSpin className='loader' color="#F7931E" ariaLabel="tail-spin-loading" radius="1" visible={true} wrapperStyle={{display:'flex',justifyContent:'center', alignItems:'center', minHeight:'80vh'}} />
  )

  failureView = () => {
    return <Redirect to='/page-not-found' />
  }

  renderSpecificProductDetails = () => {
    const {specificRestaurantDetailsList} = this.state
    return( <>
      <div className='restaurant-card'>
        <img src={specificRestaurantDetailsList.imageUrl} className='specific-restaurant-image' />
        <div className='specific-restaurant-details'>
          <h1 className='specific-restaurant-name'>{specificRestaurantDetailsList.name}</h1>
          <p className='specific-restaurant-cuisine'>{specificRestaurantDetailsList.cuisine}</p>
          <p className='specific-restaurant-location'>{specificRestaurantDetailsList.location}</p>
          <div className='rating-cost-container'>
            <div className='rating-review-container'>
              <div className='specific-restaurant-rating-container'>
                <AiFillStar style={{color:'#ffffff'}} />
                <span className='specific-restaurant-rating'>{specificRestaurantDetailsList.rating}</span>
              </div>
              <p className='specific-restaurant-review'>{specificRestaurantDetailsList.reviewsCount}+ Ratings</p>
            </div>
            <hr />
            <div className='cost-container'>
              <p className='cost'>{specificRestaurantDetailsList.costForTwo} Rs</p>
              <p className='cost-description'>Cost for two</p>
            </div>
          </div>
        </div>
      </div>
      <FoodItems foodItemsList={specificRestaurantDetailsList.foodItems} isFoodItemClicked={this.isFoodItemClicked} increaseQuantity={this.increaseQuantity} decreaseQuantity={this.decreaseQuantity} />
      <Footer />
    </>)
  }

  componentDidMount(){
    this.getSpecificRestaurantDetails()
  }

  renderSpecificProductItemView = () => {
    const {apiStatus} = this.state
    switch (apiStatus){
      case apiStatusConstants.loading:
        return this.loadingView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.success:
        return this.renderSpecificProductDetails()
      default:
        return null
    }
  }

  render(){
    return(
      <div style={{width:'100%'}}>
        <Header />
        {this.renderSpecificProductItemView()}
      </div>
    )
  }

}

export default SpecificRestaurantDetails