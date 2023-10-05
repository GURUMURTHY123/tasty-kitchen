import React from 'react'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import ImageSlick from '../ImageSlick'
import RestaurantDetails from '../RestaurantDetails'
import {TailSpin} from 'react-loader-spinner'
import Footer from '../Footer'

const apiStatusConstants = {
  initial:'INITIAL',
  loading:'LOADING',
  failure:'FAILURE',
  success:'SUCCESS'
}

const sortByOptions = [
  {
    optionId: 'Lowest',
    displayText: 'Lowest',
  },
  {
    optionId: 'Highest',
    displayText: 'Highest',
  },
]

const closedTimings = ["20 PM", "21 PM", "22 PM", "23 PM", "24 PM"]


class Home extends Component{

  state={offersDataList:[],restaurantDetailsList:[],activePage:1,activeOptionId:sortByOptions[0].optionId,apiStatus:apiStatusConstants.initial, inputValue:""}

  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurantDetails)
  }

  updateActivePage = activePage => {
    this.setState({activePage}, this.getRestaurantDetails)
  }

  updateSearchInput = value =>{
    this.setState({inputValue:value})
  }

  getCarouselImages = async () => {
    await this.setState({apiStatus:apiStatusConstants.loading})
    let url = 'https://apis.ccbp.in/restaurants-list/offers'
    let options = {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        Accept:'application/json',
        Authorization: `Bearer ${Cookies.get('jwt_token')}`
      }
    }
    const response = await fetch(url, options)
    if(response.ok===true){
      const {offers} = await response.json()
      this.setState({offersDataList:offers})
    }else{
      this.setState({apiStatus:apiStatusConstants.failure})
    }
  }

  getFormattedData = restaurant => ({
    hasOnlineDelivery: true,
    userRating: {
      ratingText: restaurant.user_rating.rating_text,
      ratingColor: restaurant.user_rating.rating_color,
      totalReviews: restaurant.user_rating.total_reviews,
      rating: restaurant.user_rating.rating
    },
    name: restaurant.name,
    hasTableBooking: restaurant.has_table_booking,
    isDeliveringNow: restaurant.is_delivering_now,
    costForTwo: restaurant.cost_for_two,
    cuisine: restaurant.cuisine,
    imageUrl: restaurant.image_url,
    id: restaurant.id,
    menuType: restaurant.menu_type,
    location: restaurant.location,
    opensAt: restaurant.opens_at,
    groupByTime: restaurant.group_by_time,
    closedAt: closedTimings[Math.floor((Math.random()*10)/2)]
    })

  getRestaurantDetails = async () => {
    const {activePage, activeOptionId} = this.state
    const limit = 9;
    const offset = (activePage - 1) * limit
    let url=`https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionId}`
    let options = {
      method:'GET',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
        Authorization:`Bearer ${Cookies.get('jwt_token')}`
      }
    }
    const response = await fetch(url, options)
    if(response.ok===true){
      const {restaurants} = await response.json()
      const formattedData = restaurants.map(eachRestaurant=>(this.getFormattedData(eachRestaurant)))
      this.setState({restaurantDetailsList:formattedData, apiStatus:apiStatusConstants.success})
    }else{
      this.setState({apiStatus:apiStatusConstants.failure})
    } 
  }

  loadingView = () => (
    <TailSpin className='loader' color="#F7931E" ariaLabel="tail-spin-loading" radius="1" visible={true} wrapperStyle={{display:'flex',justifyContent:'center', alignItems:'center', minHeight:'80vh'}} />
  )

  failureView = () => {
  return <Redirect to='/page-not-found' />
  }
  
  componentDidMount(){
    this.getCarouselImages()
    this.getRestaurantDetails()
  }

  renderProductDetails = () => {
    const {offersDataList, restaurantDetailsList, activeOptionId, activePage, inputValue} = this.state
    return (<>
      <ImageSlick offers={offersDataList} />
      <RestaurantDetails restaurantDetailsList={restaurantDetailsList} activeOptionId={activeOptionId} sortByOptions={sortByOptions} updateActiveOptionId={this.updateActiveOptionId} activePage={activePage} updateActivePage={this.updateActivePage} updateSearchInput={this.updateSearchInput} inputValue={inputValue} />
      <Footer />
      </>)
  }

  renderImageSlickAndProductDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus){
      case apiStatusConstants.loading:
        return this.loadingView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.success:
        return this.renderProductDetails()
      default:
        return null
    }
  }

  render(){
    return(
    <div style={{width:'100%'}} className='home-bg-container'>
      <Header active='Home' />
      {this.renderImageSlickAndProductDetails()}
    </div>)
  }
}

export default Home