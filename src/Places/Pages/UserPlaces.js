import React,{useState, useEffect} from 'react'
import PlaceList from './../components/PlaceList';
import {useParams} from 'react-router-dom'
import ErrorModal from '../../Shared/UIelements/ErrorModel';
import LoadingSpinner from '../../Shared/UIelements/LoadingSpinner';
import { useHttpClient } from '../../Shared/hooks/http-hook';

const UserPlaces=()=>{
        const userId=useParams().uid;
        const [loadedPlaces,setLoadedPlaces]=useState();
        const {isLoading,error,sendRequest,clearError}=useHttpClient();
        useEffect(()=>{
            const  fetchPlaces=async()=>{
            try {
               const responseData= await sendRequest(
                   `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
               );
               setLoadedPlaces(responseData.places)
            } catch (error) {
                 }
           };
           fetchPlaces();
        },[sendRequest,userId])
    return (

        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && <LoadingSpinner asOverlay/>}
         {loadedPlaces &&<PlaceList places={loadedPlaces} />}
        </React.Fragment>
    )
}

export default UserPlaces
