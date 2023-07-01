import React from 'react';
import {connect} from "react-redux";

const ProfileCard = (props) => {
  const {username,currentuser}=props
  return(
    <div>
      {username==currentuser ? currentuser : 'kullanıcı adı farklı'}
    </div>
  )
};

const mapStateToProps=(store)=>{
  return{
    username:store.username
  }
}
export default connect(mapStateToProps)(ProfileCard);