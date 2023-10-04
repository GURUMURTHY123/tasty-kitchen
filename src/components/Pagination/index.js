import React from 'react'
import {AiOutlineLeftSquare, AiOutlineRightSquare} from 'react-icons/ai'

const Pagination = props => {
  const {activePage, updateActivePage} = props

  const increaseCurrentPageNumber = () => {
    (activePage===4) ? updateActivePage(1) : updateActivePage(activePage + 1)
  }

  const decreaseCurrentPageNumber = () => {
    (activePage===1) ? updateActivePage(4) : updateActivePage(activePage - 1)
  }

  const totalRestaurants = 30
  const totalPages = Math.ceil(totalRestaurants/9)

  return(
    <div style={{display:'flex',alignItems:'center', justifyContent:'center', marginBottom:'64px', color:'#334155'}}>
      <AiOutlineLeftSquare size='32px' onClick={decreaseCurrentPageNumber} />
      <p style={{marginRight:'8px',marginLeft:'8px', color:'#334155', fontFamily:'Bree Serif', fontSize:'20px'}}>{activePage} of {totalPages}</p>
      <AiOutlineRightSquare size='32px' onClick={increaseCurrentPageNumber} />
    </div>
  )
}

export default Pagination