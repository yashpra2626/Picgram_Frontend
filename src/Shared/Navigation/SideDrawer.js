import React from 'react'
import ReactDOM from 'react-dom'
import './SideDrawer.css'
import {CSSTransition} from "react-transition-group"
const  SideDrawer=(props) =>{
    
    return ReactDOM.createPortal(
        <CSSTransition 
          in={props.show}
          timeout={1000}
          classNames="slide-in-left"
          mountOnEnter
          unmountOnExit>
              <aside onClick={props.onClick} className="side-drawer">{props.children}</aside>
          </CSSTransition>,document.getElementById("drawer")
        
        
    );
        
        
        
        
};

export default SideDrawer;
