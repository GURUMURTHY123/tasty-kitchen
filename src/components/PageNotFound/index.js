import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
    <div className='failure-view-container'>
      <img src='https://res.cloudinary.com/datzkejai/image/upload/v1694173183/erroring_1_rreov4.png' className='failure-view-image' />
      <h1 className='failure-view-heading'>Page Not Found</h1>
      <p className='failure-view-description'>We are sorry, the page you requested could not be found.Please go back to the homepage</p>
      <Link to='/' style={{textDecoration:'none'}}><button className='failure-view-btn'>Home Page</button></Link>
    </div>
)

export default PageNotFound