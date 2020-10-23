import React from 'react'
import './Button.css'
import {Link} from "react-router-dom"
const Button=(props)=> {
    if(props.to)
       { 
         return(
         <Link
           className={`button button--${props.size || 'default' }  
              ${props.inverse && 'button--inverse'}
              ${props.danger && 'button--danger'}
             `}
            to={props.to}
            exact={props.exact}
          >
         {props.children}
         </Link>
          ); }
    return (
        
         <button   
         type={props.type}
         onClick={props.onClick}
         disabled={props.disabled}
         className={`button button--${props.size || 'default' }  
            ${props.inverse && 'button--inverse'}
            ${props.danger && 'button--danger'}
          `}
          >
          {props.children}   
        </button>   
        
    )
}

export default Button
