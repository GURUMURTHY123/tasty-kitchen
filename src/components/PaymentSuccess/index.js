import React from 'react'
import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'

const PaymentSuccess = () => (
    <div>
      <Header active='Cart' />
      <div className='success-container'>
        <img src='https://res.cloudinary.com/datzkejai/image/upload/v1694182856/check-circle.1_1_pa5nbn.png' alt='payment-success-image' className='success-image' />
        <h1 className='success-heading'>Payment Successful</h1>
        <p className='success-description'>Thank you for orderingYour payment is successfully completed.</p>
        <Link to='/' style={{textDecoration:'none'}}><button className='go-to-home-button'>Go To Home Page</button></Link>
      </div>
    </div>
)

export default PaymentSuccess