import {useReducer,useCallback} from'react';

const formReducer=(state,action)=>{

    switch(action.type){
       case "INPUT_CHANGE":
         let formIsValid=true;
         for(const input in state.inputs){
           if(!state.inputs[input]){
             continue;
           }
           if(input===action.input){
             formIsValid=formIsValid &&  action.isValid;
           }
           else{
             formIsValid=formIsValid && state.inputs[input].isValid;
           }
         }
         return{
           ...state,
           inputs:{
             ...state.inputs,
             [action.input]:{value:action.value,isValid:action.isValid}
           },
           isValid: formIsValid
         };
         case "SET_DATA" :
           return {
             inputs: action.inputs,
             isValid:action.isValid
           }
        default:
          return state;
    }
  };

const useForm=(initialState)=>{
const [formState, dispatch] = useReducer(formReducer, initialState)
const inputHandler=useCallback((id,value,isValid)=>{
    dispatch({
      type:"INPUT_CHANGE",
    input: id,
    value: value,
    isValid: isValid
    })

  },[]);
const setFormData=useCallback((stateData)=>{
  dispatch({
    type:"SET_DATA",
    inputs: stateData.inputs,
    isValid: stateData.isValid
 });

},[]);
        
  return [formState,inputHandler,setFormData]
}


export default useForm;