import React from 'react';

const ProfileCard = (props) => {
  const{username,currentuser} = props
  return (
    <div>
      {username==currentuser ? currentuser : 'kullanıcı adı farklı'}
    </div>
  );
};

export default ProfileCard;