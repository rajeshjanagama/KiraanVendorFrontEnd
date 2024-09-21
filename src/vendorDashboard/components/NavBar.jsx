import React from 'react'

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogOut, logOutHandler }) => {


  const ShopName = localStorage.getItem('shopName')


  return (
    <div className="navSection">

      <div className="company">
        Kiraan Vendor
      </div>
      <div className="ShopName">
            <h4>Shop name : {ShopName}</h4>
        </div>
      <div className="userAuth">
        {!showLogOut ? <>
          <span onClick={showLoginHandler}>Login</span>
          <span onClick={showRegisterHandler}>/ Register</span>
        </> : <span onClick={logOutHandler}
          className='logout'
        >Logout</span>}

      </div>
    </div>
  )
}

export default NavBar
