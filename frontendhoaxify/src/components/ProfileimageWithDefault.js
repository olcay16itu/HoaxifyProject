import React from 'react';
import logo from "../assets/profile.png";
const ProfileimageWithDefault = (props) => {
  let imageSource=logo
  if(props.image){
    imageSource=props.image;
  }
  return (
      <img src={imageSource}  {...props}/>
  );
};

export default ProfileimageWithDefault;