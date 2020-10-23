import {useState,useCallback} from 'react';

export const useHttpClient=()=>{
    const [error,setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const clearError=()=>{
        setError(null);
    }
    const sendRequest=useCallback(
        async(  
        url,
        method='GET' ,
        body=null ,
        headers={}
        )=>{
            setIsLoading(true);
        try{
           const response =await fetch(url,{method ,body,headers});
           const responseData= await response.json();

           if(!response.ok){
               throw new Error(responseData.message);
            }
         setIsLoading(false);
         return responseData;
        }catch(err){
          setError(err.message);
          setIsLoading(false);
          }
        },[])
     return {isLoading,error,sendRequest,clearError};
 }