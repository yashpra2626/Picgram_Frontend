import React ,{useState, useEffect} from 'react'
import UsersList from '../components/UsersList';
import ErrorModal from '../../Shared/UIelements/ErrorModel'
import LoadingSpinner from '../../Shared/UIelements/LoadingSpinner'
import { useHttpClient } from '../../Shared/hooks/http-hook';

const  User=()=> {
    const [loadedUsers,setLoadedUsers] = useState();
    const {isLoading,error,sendRequest,clearError} = useHttpClient();
    useEffect(()=>{
      const fetchUsers=async()=>{
          try {
             const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
            setLoadedUsers(responseData.users);
        
          } catch (err) {
               
           }
      }
      fetchUsers();
    },[])
    
    return (
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading&& <LoadingSpinner asOverlay/>}
       {loadedUsers&& <UsersList users={loadedUsers}/>   }
        </React.Fragment>
    )
}

export default User
