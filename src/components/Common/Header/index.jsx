import React from 'react'
import "./style.css"
import TemporaryDrawer from './drawer'
import Button from '../Button'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='navbar'>
      <h1 className='logo'>CryptoTracker<span style={{color: "var(--blue)" }}>.</span></h1>
      <div className='links'>
        <Link to='/' className='link'>Home</Link>
        <Link to='/compare' className='link'>Compare</Link>
        <Link to='/dashboard'>
          <Button text={"DashBoard"} 
            outline={true}
            onclick={()=>console.log("Btn clicked")}/>
        </Link>
      </div>
      <div className='mobile-drawer'>
        <TemporaryDrawer/>
      </div>
    </div>
  )
}

export default Header