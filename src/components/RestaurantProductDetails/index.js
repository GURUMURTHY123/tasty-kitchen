import React from 'react'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantProductDetails = props => {
  const {restaurantDetailsList, userInput} = props
  const updatedRestaurantDetailsList = restaurantDetailsList.filter(eachRestaurant=>(eachRestaurant.name.includes(userInput)))
  return(
    <div className='restaurant-detail-container'>
      {(updatedRestaurantDetailsList.length===0) ? <div className='empty-container'><p>Empty Results</p></div>:
        (updatedRestaurantDetailsList.map(eachRestaurantDetail=>(
          <Link to={`/restaurants-list/${eachRestaurantDetail.id}`} style={{textDecoration:'none'}} >
            <div className='restaurant-detail-card'>
              <img src={eachRestaurantDetail.imageUrl} className='restaurant-image' />
              <div className='restaurant-text-container'>
                <h2 className='restaurant-detail-container-heading'>{eachRestaurantDetail.name}</h2>
                <p className='restaurant-menu-type'>{eachRestaurantDetail.menuType}</p>
                <p className='restaurant-review'><AiFillStar style={{color:'#FFCC00'}} /><span className='restaurant-rating'>{eachRestaurantDetail.userRating.rating}</span>({eachRestaurantDetail.userRating.totalReviews} ratings)</p>
              </div>
            </div>
          </Link>
      )))}
    </div>
  )
}

export default RestaurantProductDetails