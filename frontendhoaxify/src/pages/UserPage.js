import React, {useEffect, useState} from 'react';
import ProfileCard from "../components/ProfileCard";
import {getUser} from "../api/apiCalls";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useApiProgress} from "../shared/ApiProgress";

const UserPage = () => {
  const [user,setUser]=useState({});
  const {username}=useParams()
  const[notFound,setNotFound]=useState(false);
  const{t}=useTranslation();
  const pendingApiCall = useApiProgress("api/1.0/users/"+username);
    useEffect(()=>{
      const loadUser=async()=>{
        try{
          const response = await getUser(username);
          setUser(response.data)
          setNotFound(false)
        }catch (error){
          setNotFound(true);
        }

      }
      loadUser()
  },[username])

  if(pendingApiCall){
    return(<div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>)
     }

  if(notFound){
    return( <div className="alert alert-danger text-center">
        <span className="material-icons " style={{fontSize:'50px'}} >
          error
      </span>
    <div style={{fontSize:'25px'}}>
      {t("User not Found")}
      </div>
    </div>
  )
  }

  return (
    <div className="container">
      {!pendingApiCall&&<ProfileCard user={user}></ProfileCard>}
    </div>
  );

};

export default UserPage;