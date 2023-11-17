import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/signUp')
    }
    return (
        <div>

            <img src="https://cdn2.vectorstock.com/i/1000x1000/95/31/online-shop-logo-ecommerce-logo-design-vector-32009531.jpg" 
            alt="logo"  
            className='logo'
            />
            {
                auth ?
                    <ul className='nav_ul'>
                        <li><Link to='/'>Product</Link></li>
                        <li><Link to='/addProduct'>Add Product</Link></li>
                        <li><Link to='/updateProduct'>Update Product</Link></li>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link onClick={logout} to='/signUp'>Logout [ {JSON.parse(auth).user} ]</Link></li>
                    </ul>
                    :
                    <ul className='nav_ul nav-right'>
                        <li><Link to='/signUp'>Sign Up</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>


            }


        </div >
    )
}

export default Nav