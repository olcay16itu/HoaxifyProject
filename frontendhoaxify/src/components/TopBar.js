import React from 'react';
import logo from '../assets/hoaxify.png'
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {LogoutSuccess} from "../redux/authActions";

const TopBar =(props)=> {
  //static contextType=Authentication;
  //Normalde Authentication.Provider ile sarılabilir ancak okunulurabilite artırılması için class componentlarda
  //üstteki gibi kullanılabilir.Burda mantık component property olarak function alıyor ve o functionı çağırırken
  // authenticationdan aldıgı valueyi function içerisinde kullanıp render ediyor.Bu sayede state drill gerek kalmıyor.
  //onClickLogout=()=>{
  //  this.props.dispatch(LogoutSuccess())
  //}
    const {t,isLoggedin,username,onLogoutSuccess} = props
    let links = <ul className="navbar-nav ms-auto">
      <li><Link className="nav-link" to="/login">{t("Login")}</Link></li>
      <li><Link className="nav-link" to="/signup">{t("Sign Up")}</Link></li>
    </ul>
    if (isLoggedin) {
      links = <ul className="navbar-nav ms-auto">
        <li><Link className="nav-link" to={"/user/" + username}>{username}</Link></li>
        <li className="nav-link" onClick={onLogoutSuccess} style={{cursor: 'pointer'}}>{t("Logout")}</li>
      </ul>
    }
    return(
      <div className="shadow-sm bg-light mb-2">
        <nav className="navbar navbar-light bg-light container navbar-expand">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="60" alt="hoaxify logo"/>
            Hoaxify
          </Link>
          {links}
        </nav>
      </div>
    );
}

const TranslatedtopBar = withTranslation()(TopBar);
const MapStateToProps=(store)=>{
  return{
    isLoggedin:store.isLoggedin,
    username:store.username
  }
}
const MapDispatchToProps=(dispatch)=>{
  return{
    onLogoutSuccess:()=>{
      return dispatch(LogoutSuccess())
    }
  }
}
export default connect(MapStateToProps,MapDispatchToProps)(TranslatedtopBar);