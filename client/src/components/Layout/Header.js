import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AiOutlineShop } from 'react-icons/ai'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import SearchInput from '../Form/SearchInput.js'
import { Badge } from 'antd'
import { useCart } from '../../context/cart'
import useCategory from '../../hooks/useCategory'
import './header.css';

const Header = () => {
  const [auth, setAuth] = useAuth()
  const [cart] = useCart()
  const categories = useCategory()
  const handleLogout = () => {
    setAuth({
      ...auth, user: null,
      token: ''
    })
    localStorage.removeItem('auth');
    toast.success("Logout Successully");
  }
  return (


    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/"> <AiOutlineShop style={{ color: 'white' }} />  <text style={{ color: 'white' }}>David bikegear</text></Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink className="nav-link " to="/"> <text style={{ color: 'white', }}>Home</text></NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/about"> <text style={{ color: 'white' }}>About</text></NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/category"}
                  data-bs-toggle="dropdown"
                >
                  <text style={{ color: 'white' }}> Categories</text>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {
                !auth.user ? (<>
                  {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                  </li> */}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login"> <text style={{ color: 'white' }}>Login</text></NavLink>
                  </li>
                </>) : (<>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" to='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <text style={{ color: 'white' }}>  {auth?.user?.name}</text>
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink></li>
                      <li className="nav-item">
                        <NavLink onClick={handleLogout} className="dropdown-item" to="/login"> Logout</NavLink>
                      </li>
                    </ul>
                  </li>
                </>)
              }
              <li className="nav-item">
                <NavLink className="nav-link " to="/contact"> <text style={{ color: 'white' }}>Contact</text></NavLink>
              </li>
              <li className="nav-item">
                {/* <Badge count={cart?.length} showZero>
                  <NavLink className="nav-link" to="/cart">Cart</NavLink>
                </Badge> */}

              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
