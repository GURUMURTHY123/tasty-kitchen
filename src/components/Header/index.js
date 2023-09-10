import React from 'react'
import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {RxHamburgerMenu} from 'react-icons/rx'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component{
  
  state = {isHamburgClicked:false, isClickedLogoutBtn:false}

  onClickLogoutBtn = async () => {
    await Cookies.remove('jwt_token');
    this.setState({isClickedLogoutBtn:true})
  }

  render(){
    const {active} = this.props
    const {isHamburgClicked, isClickedLogoutBtn} = this.state
    return(
      <>
        {isClickedLogoutBtn&&<Redirect to='/login' />}
        <nav className='header-nav-container'>
          <div className='nav-logo-container'>
            <Link to='/' style={{textDecoration:'none'}}><img src="https://res.cloudinary.com/datzkejai/image/upload/v1693318351/Frame_274_sjze9r.png" alt="website logo" className="nav-website-logo" /></Link>
            <p className="nav-logo-text">Tasty Kitchens</p>
          </div>
          <div className='nav-link-container'>
            <Link to="/" style={{textDecoration:'none'}}><a className={`nav-link-element ${active==='Home'?'active-element':'null'}`}>Home</a></Link>
            <Link to='/cart' style={{textDecoration:'none'}}><a className={`nav-link-element ${active==='Cart'?'active-element':'null'}`}>Cart</a></Link>
            <button className='nav-logout-btn' onClick={this.onClickLogoutBtn}>Logout</button>
          </div>
        </nav>
        <nav className='mobile-nav-bg-container'>
          <div className='mobile-nav-container'>
            <div className='nav-logo-container'>
            <Link to='/' style={{textDecoration:'none'}}><img src="https://res.cloudinary.com/datzkejai/image/upload/v1693318351/Frame_274_sjze9r.png" alt="website logo" className="nav-website-logo" /></Link>
              <p className="nav-logo-text">Tasty Kitchens</p>
            </div>
            <RxHamburgerMenu size='24px' style={{color:'#183B56'}} onClick={()=>{this.setState({isHamburgClicked:!(isHamburgClicked)})}} />
          </div>
          {isHamburgClicked&&(
            <div className="nav-link-container">
              <Link to="/" style={{textDecoration:'none'}}><a className={`nav-link-element ${active==='Home'?'active-element':'null'}`}>Home</a></Link>
              <Link to='/cart' style={{textDecoration:'none'}}><a className={`nav-link-element ${active==='Cart'?'active-element':'null'}`}>Cart</a></Link>
              <button className='nav-logout-btn' onClick={this.onClickLogoutBtn}>Logout</button>
              <button className='nav-remove-btn' onClick={()=>{this.setState({isHamburgClicked:false})}}>X</button>
            </div>
          )}
        </nav>
      </>
    )
  }
}

Header.defaultProps = {
  active:"Home"
}

export default Header