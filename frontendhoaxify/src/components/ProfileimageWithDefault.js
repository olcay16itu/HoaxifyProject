import React from 'react';
import logo from "../assets/profile.png";
const ProfileimageWithDefault = (props) => {
  let imageSource=logo
  if(props.image){
    imageSource='images/'+props.image;
  }
  return (
      <img src={props.tempimage||imageSource}  {...props} onError={(event)=>{
        event.target.src = logo;
      }}/>
  );
};

export default ProfileimageWithDefault;