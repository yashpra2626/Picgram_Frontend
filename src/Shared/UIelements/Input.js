import React from 'react'
import './Input.css'
import {useReducer,useEffect} from 'react';
import { validate } from '../../Users/components/util/validators';


const  Input=(props)=> {
    const initialState={value:props.value,isValid:props.isValid,isTouched:false}
    const inputReducer=(state,action)=>{
        switch(action.type)
        {
            case 'CHANGE':
                return{
                    ...state,
                    value: action.value,
                   isValid: validate(action.value,action.validators),
                };
            case 'TOUCH':
                return{
                    ...state,
                    isTouched: true
                    };
            default :
               return state;
                
        }

    }
    const  [inputState, dispatch] = useReducer(inputReducer, initialState)
    const changeHandler=(event)=>{
         dispatch({
             type:'CHANGE',
             value: event.target.value,
             validators:props.validators
             })
          };
    const touchHandler=(event)=>{
         dispatch({  type:'TOUCH',
             });
    }
    const {id,onInput}=props;
    const {value,isValid}=inputState;

    useEffect(() => {
        props.onInput(id,value,isValid)
        
    }, [id,value,isValid,onInput]);

    let element= props.element ?(
         <input
         className={`form-control`}
          type={props.type}
          id={id}
          placeholder={props.placeholder}
          value={inputState.value}
          name={props.name}
          onChange={changeHandler}  
          onBlur={touchHandler}       
         />
          ): (
         <textarea
         className={`form-control`}
         placeholder={props.placeholder}
         id={id}
         rows={props.rows || 4}
         name={props.name}
         value={inputState.value}
         onChange={changeHandler}
         onBlur={touchHandler}
         />)
    return (
        <div className={`form-control ${!inputState.isValid&&inputState.isTouched &&'form-control--invalid'}`}>
            <label htmlFor={id}>{props.label}</label>
         {element} 
          
    {!inputState.isValid&&inputState.isTouched&& <p>{props.errorText}</p>} 
        
        </div>
    );
};

export default Input
