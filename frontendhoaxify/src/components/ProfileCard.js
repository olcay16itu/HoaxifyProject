import React from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

const ProfileCard = (props) => {
  const {username:loggedinusername}=useSelector((store)=>{
    return{
      username:store.username
    }
  })
  const params=useParams()
  const{username:currentuser}=params
  return(
    <div>
      {loggedinusername===currentuser ? currentuser : 'kullanıcı adı farklı'}
    </div>
  )
};


export default ProfileCard;