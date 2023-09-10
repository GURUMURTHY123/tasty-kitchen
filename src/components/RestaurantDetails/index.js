import React from 'react'
import {MdOutlineSort} from 'react-icons/md'
import RestaurantProductDetails from '../RestaurantProductDetails'
import Pagination from '../Pagination'
import './index.css'

const RestaurantDetails = props => {
  const {restaurantDetailsList, activeOptionId,sortByOptions,updateActiveOptionId, activePage, updateActivePage} = props

  const onChangeSortBy = event => {
    updateActiveOptionId(event.target.value)
  }
  return(
    <div className='restaurant-details-view-container'>
      <h1 className='restaurant-container-heading'>Popular Restaurants</h1>
      <div className='restaurant-container-description'>
        <p className='restaurant-description'>Select Your favourite restaurant special dish and make your day happy...</p>
        <div className='restaurant-sort-icon-container'>
          <MdOutlineSort className='sort-icon' />
          <span className='span-element'>Sort by </span>
          <select  className='select-container' value={activeOptionId} onChange={onChangeSortBy}>
            {sortByOptions.map(eachOption => (
              <option key={eachOption.optionId} value={eachOption.optionId} className='select-option'>
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr className='separator' />
      <RestaurantProductDetails restaurantDetailsList={restaurantDetailsList} />
      <Pagination activePage={activePage} updateActivePage={updateActivePage} />
    </div>
  )
}

export default RestaurantDetails