import React from 'react';
import {Authentication} from "../shared/AuthenticationContext";

const ProfileCard = (props) => {
  return(
    <Authentication.Consumer>
      {value => {
        const currentuser=value.state.username
        const{username}=props
        return (
          <div>
            {username==currentuser ? currentuser : 'kullanıcı adı farklı'}
          </div>
        );
      }}
    </Authentication.Consumer>
  )
};

export default ProfileCard;