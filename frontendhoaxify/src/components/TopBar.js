import React, {Component} from 'react';
import logo from '../assets/hoaxify.png'
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
class TopBar extends Component {
  render() {
    const {t,isLoggedin,username,onLogoutSuccess} = this.props
    let links = <ul className="navbar-nav ms-auto">
      <li><Link className="nav-link" to="/login">{t("Login")}</Link></li>
      <li><Link className="nav-link" to="/signup">{t("Sign Up")}</Link></li>
    </ul>
    if(isLoggedin){
      links = <ul className="navbar-nav ms-auto">
        <li><Link className="nav-link" to={"/user/"+username}>{username}</Link></li>
        <li className="nav-link" onClick={onLogoutSuccess} style={{cursor:'pointer'}}>{t("Logout")}</li>
      </ul>
    }
    return (
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
}

const TranslatedtopBar = withTranslation()(TopBar);
export default TranslatedtopBar;