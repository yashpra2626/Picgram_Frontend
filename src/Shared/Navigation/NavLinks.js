import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import "./NavLinks.css"
import { AuthContext } from '../Context/AuthContext'

const NavLinks=()=> {
    const auth= useContext(AuthContext);
    return (
        <ul className='nav-links'>
        <li>
         <NavLink to='/' exact >All Users</NavLink>  
        </li>
        {auth.isLoggedIn &&<li>
         <NavLink to={`/${auth.userId}/places`} >My Places</NavLink>  
        </li>}
        {auth.isLoggedIn &&<li>
        <NavLink to='/places/new'>Add Place</NavLink>
        </li>}
        {!auth.isLoggedIn?(<li>
        <NavLink to='/auth'>Auth</NavLink>
        </li>):(<li>
            <button onClick={auth.logout}>Log Out</button></li>)}
        </ul>
    )
}

export default NavLinks;
