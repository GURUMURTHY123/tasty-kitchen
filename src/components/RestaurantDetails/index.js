import React from 'react'
import {MdOutlineSort} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'
import RestaurantProductDetails from '../RestaurantProductDetails'
import Pagination from '../Pagination'
import './index.css'

const RestaurantDetails = props => {
  const {restaurantDetailsList, activeOptionId,sortByOptions,updateActiveOptionId, activePage, updateActivePage, updateSearchInput, inputValue} = props

  const onChangeSortBy = event => {
    updateActiveOptionId(event.target.value)
  }

  const changeInput = event =>{
    updateSearchInput(event.target.value)
  }

  return(
    <div className='restaurant-details-view-container'>
      <h1 className='restaurant-container-heading'>Popular Restaurants</h1>
      <div className='restaurant-container-description'>
        <p className='restaurant-description'>Select Your favourite restaurant special dish and make your day happy...</p>
        <div className='restaurant-sort-icon-container'>
          <div className='search-container'>
            <input type="text" value={inputValue} style={{border:"none",borderRadius:"8px", outline:"none",padding:"5px",overflow_x:'scroll'} } className='search-input' onChange={changeInput} />
            <AiOutlineSearch size={24} />
          </div>
          <div className='sort-container'>
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
      </div>
      <hr className='separator' />
      <RestaurantProductDetails restaurantDetailsList={restaurantDetailsList} userInput={inputValue} />
      <Pagination activePage={activePage} updateActivePage={updateActivePage} />
    </div>
  )
}

export default RestaurantDetails