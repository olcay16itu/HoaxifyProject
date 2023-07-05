import React from 'react';
import logo from '../assets/profile.png'
import {Link} from "react-router-dom";
import ProfileimageWithDefault from "./ProfileimageWithDefault";

const UserListitem = (props) => {
  const{user}=props
  const{displayname,username,image}=user

  return (
    <Link className="list-group-item list-group-item-action" to={`/user/${username}`}>
      <ProfileimageWithDefault className={"rounded-circle"} image={image}  alt={`${username} profile`}
                               width={"24"} height={"24"} username={username} displayname={displayname}></ProfileimageWithDefault>
      <span className="ps-2">{displayname}@{username}</span>
    </Link>
  )
};

export default UserListitem;