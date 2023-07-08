import React, {useEffect, useRef, useState} from 'react';
import logo from '../assets/hoaxify.png'
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch,useSelector} from "react-redux";
import {LogoutSuccess} from "../redux/authActions";
import ProfileimageWithDefault from "./ProfileimageWithDefault";

const TopBar =(props)=> {
  //static contextType=Authentication;
  //Normalde Authentication.Provider ile sarılabilir ancak okunulurabilite artırılması için class componentlarda
  //üstteki gibi kullanılabilir.Burda mantık component property olarak function alıyor ve o functionı çağırırken
  // authenticationdan aldıgı valueyi function içerisinde kullanıp render ediyor.Bu sayede state drill gerek kalmıyor.
  //onClickLogout=()=>{
  //  this.props.dispatch(LogoutSuccess())
  //}
    const {t} = useTranslation()
    const dispatch=useDispatch()
    const{username,isLoggedin,displayname,image}=useSelector( (store)=>{
      return{
      isLoggedin:store.isLoggedin,
      username:store.username,
        displayname:store.displayname,
        image:store.image
    };
    })
  const menuArea = useRef(null);

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('click', menuClickTracker);
    return () => {
      document.removeEventListener('click', menuClickTracker);
    };
  }, [isLoggedin]);

  const menuClickTracker = event => {
    if (menuArea.current === null || !menuArea.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };
    const onLogoutSuccess=()=>{
      dispatch(LogoutSuccess())
    }
    let links = <ul className="navbar-nav ms-auto">
      <li><Link className="nav-link" to="/login">{t("Login")}</Link></li>
      <li><Link className="nav-link" to="/signup">{t("Sign Up")}</Link></li>
    </ul>
    if (isLoggedin) {
      let dropDownClass = 'dropdown-menu p-0 shadow';
      if (menuVisible) {
        dropDownClass += ' show';
      }
      links = <ul className="navbar-nav ms-auto" ref={menuArea}>
        <li className="nav-item dropdown">
          <div className="d-flex" style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
            <ProfileimageWithDefault image={image} width="32" height="32" className="rounded-circle m-auto" />
            <span className="nav-link dropdown-toggle">{displayname}</span>
          </div>
          <div className={dropDownClass}>
            <Link className="dropdown-item d-flex p-2" to={`/user/${username}`} onClick={() => setMenuVisible(false)}>
              <i className="material-icons text-info mr-2">person</i>
              {t('My Profile')}
            </Link>
            <span className="dropdown-item  d-flex p-2" onClick={onLogoutSuccess} style={{ cursor: 'pointer' }}>
              <i className="material-icons text-danger mr-2">power_settings_new</i>
              {t('Logout')}
            </span>
          </div></li>
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

export default TopBar;