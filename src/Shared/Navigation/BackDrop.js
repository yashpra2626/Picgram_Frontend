import React from 'react'
import './BackDrop.css'
import ReactDOM from 'react-dom'

const  BackDrop=(props)=> {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={props.onClick}></div>
        ,document.getElementById("backdrop")
    );
}

export default BackDrop;
