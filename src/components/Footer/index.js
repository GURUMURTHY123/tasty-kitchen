import React from 'react'
import {AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook} from 'react-icons/ai'
import './index.css'

const Footer = () => {
  return(
    <div className='footer-bg-container'>
      <div className='footer-logo-container'>
        <img src="https://res.cloudinary.com/datzkejai/image/upload/v1693806442/Frame_275_wdbi0y.png" alt="website logo" className="footer-website-logo" />
        <p className="footer-logo-text">Tasty Kitchens</p>
      </div>
      <p className='footer-description'>The only thing we are serious about is food.<br />Contact us on</p>
      <div style={{paddingLeft:'20px'}}>
        <img src='https://res.cloudinary.com/datzkejai/image/upload/v1693814012/Frame_12_nnn4x4.png' className='footer-icon' />
        <AiOutlineInstagram className='footer-icon' style={{color:'#ffffff'}}  />
        <AiOutlineTwitter className='footer-icon' style={{color:'#ffffff'}}  />
        <AiOutlineFacebook className='footer-icon' style={{color:'#ffffff'}}  />
      </div>
    </div>
  )
}

export default Footer