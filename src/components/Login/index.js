import React from 'react'
import {Component} from 'react' 
import Cookies from 'js-cookie'
import {MdVisibility} from 'react-icons/md'
import {BiHide} from 'react-icons/bi'
import './index.css'

class Login extends Component{

  state={username:'',password:'', isValid:false, isLoading:false, isVisible:false}

  onChangeUserName = event => {
    this.setState({username:event.target.value})
  }

  onChangePassword = event => {
    this.setState({password:event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.push('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    this.setState({isLoading:true})
    const {username,password} = this.state
    let userDetails={
      username, password
    }
    let url = "https://apis.ccbp.in/login"
    let options = {
      method:'POST',
      body:JSON.stringify(userDetails)
    }
    const response = await fetch(url, options)
    if (response.ok){
      const responseData = await response.json()
      const responseFormatedData = {jwtToken:responseData.jwt_token} 
      const {jwtToken} = responseFormatedData
      Cookies.set('jwt_token',jwtToken,{expires:30})
      this.onSubmitSuccess()
    }else{
      this.setState({username:'',password:'', isValid:true, isLoading:false})
    }
  }
  
  renderUserNameContainer = () => {
    const {username} = this.state
    return (<div className="input-container">
      <label htmlFor="form-username" className="label-element">Username</label>
      <input id="form-username" type="text" value={username} className="input-element" onChange={this.onChangeUserName} style={{paddingLeft:'8px'}} placeholder='rahul' />
    </div>)
  }

  renderPasswordContainer = () => {
    const {password, isValid, isVisible} = this.state
    return (<div className="input-container">
      <label htmlFor="form-password" className="label-element">PASSWORD</label>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} className="input-element">
        <input id="form-password" type={isVisible?'text':'password'} value={password} onChange={this.onChangePassword} style={{border:'none', outline:'none', backgroundColor:'var(--light-blue-gray-200, #E2E8F0)', paddingLeft:'8px'}} placeholder='rahul@2021' />
        {isVisible?<BiHide style={{paddingRight:'8px'}} size='30' onClick={()=>{this.setState({isVisible:!(isVisible)})}}/>:<MdVisibility style={{paddingRight:'8px'}} size='30' onClick={()=>{this.setState({isVisible:!(isVisible)})}}/>}
      </div>
      {isValid && <p className='invalid-text'>Please enter a valid Username & Password</p>}
    </div>)
  }

  componentDidMount(){
    if (Cookies.get('jwt_token') !== undefined){
      const {history} = this.props
      history.push('/')
    }
  }

  render(){
    const {isLoading} = this.state
    return(
      <>
        <div className="login-bg-container">
          <div className="login-container">
            <form className="login-form-container" onSubmit={this.onSubmitForm}>
              <div className='login-logo-container'>
                <img src="https://res.cloudinary.com/datzkejai/image/upload/v1693318351/Frame_274_sjze9r.png" alt="website logo" className="website-logo" />
                <span className="logo-text">Tasty Kitchens</span>
              </div>
              <h1 className="form-heading">Login</h1>
              {this.renderUserNameContainer()}
              {this.renderPasswordContainer()}
              <button type="submit" className="login-button">{
                isLoading ? "...Loading" : 'LOGIN'
              }</button>
            </form>
          </div>
          <div className="login-bg-image-container">
            <img src="https://res.cloudinary.com/datzkejai/image/upload/v1693377106/Rectangle_1456_iyzxxl.png" className="login-bg-image" />
          </div>
        </div>
        <div className="login-mobile-view-container">
          <div className="login-mobile-view-img-container">
            <h1 className="mobile-login-heading">Login</h1>
            <img src="https://res.cloudinary.com/datzkejai/image/upload/v1693378839/Rectangle_1457_p9ulxb.png" className="mobile-login-img" />
          </div>
          <form className="login-mobile-form-container" onSubmit={this.onSubmitForm}>
            {this.renderUserNameContainer()}
            {this.renderPasswordContainer()}
            <button type="submit" className="login-button">{isLoading ? '...Loading':'LOGIN'}</button>
          </form>
        </div>
      </>
    )
  }
} 

export default Login