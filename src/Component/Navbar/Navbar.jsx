import React, { useContext } from 'react'
import logo from '../../Assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';

export default function Navbar() {
  let navigate = useNavigate();
 
  function Logout(){
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('login')
  }
  let { userToken,setUserToken } = useContext(UserContext);
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {userToken != null ? <>
          <Link className="navbar-brand" to={'/'} >
            <img src={logo} alt="" />
          </Link>
        </> : <>
          <Link className="navbar-brand" to={'login'} >
            <img src={logo} alt="" />
          </Link> </>}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken != null ? <>
              <li className="nav-item">
                <Link className="nav-link" to={'/'} >Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'cart'}>cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'products'} >Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'catagories'}>Catagories</Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link" to={'brands'}>Brands</Link>
              </li>
            </> : ''}
          </ul>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item d-flex align-items-center'>
              <i className='fab fa-facebook me-2'></i>
              <i className='fab fa-twitter me-2'></i>
              <i className='fab fa-instagram me-2'></i>
              <i className='fab fa-youtube me-2'></i>
            </li>
            {userToken != null ? <>
              <li className='nav-item'>
                <span onClick={Logout}  className="nav-link cursor-pointer" >Logout</span>
              </li>
            </> : <>
              <li className='nav-item'>
                <Link className="nav-link" to={'register'}>Register</Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link" to={'login'}>Login</Link>
              </li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  </>
}
