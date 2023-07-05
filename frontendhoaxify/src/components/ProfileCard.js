import React from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import logo from "../assets/profile.png";
import ProfileimageWithDefault from "./ProfileimageWithDefault";

const ProfileCard = (props) => {
  const {username:loggedinusername}=useSelector((store)=>{
    return{
      username:store.username
    }
  })
  const{user}=props
  const{username,displayname,image}=user
  const params=useParams()
  const{username:currentuser}=params

  return(
    <div className="card">
      <div className="card-header text-center">
        <ProfileimageWithDefault className={"rounded-circle"} image={image} alt={`${username} profile`}
         width={"240"} height={"240"} username={username} displayname={displayname}></ProfileimageWithDefault>
      </div>
      <div className="card-body text-center">
        <h3>{displayname}@{username}</h3>
      </div>

    </div>
  )
};


export default ProfileCard;