import React, {useEffect, useState} from "react";
import Input from '../components/Input'
import {withTranslation} from "react-i18next";
import {ChangeLanguage} from "../api/apiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";
import {withApiProgress} from "../shared/ApiProgress";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {loginHandler} from "../redux/authActions";

const UserLoginPage = (props)=> {
  const[username,setUsername]=useState();
  const[password,setPassword]=useState();
  const[error,setError]=useState();

  useEffect(()=>{
    setError(undefined)
  },[username,password])
  const onClickLogin = async event => {
    event.preventDefault();
    const creds = {
      username: username,
      password: password
    }
    const{dispatch}=props
    setError(undefined)
    try {
      await dispatch(loginHandler(creds))
    } catch (error) {
      setError(error.response.data.message)
    }

  }

    const {t,wait,isLoggedin} = props;
    return (
      <div className="container">
        <form>
          {isLoggedin && <Navigate to={"/"}/>}
          <h1 className="text-center"> {t('Login')}</h1>
          <Input label={t("Username")}  onChange={(event)=>{
            setUsername(event.target.value)
          }}></Input>
          <Input label={t("Password")}  onChange={(event)=>{
            setPassword(event.target.value)}}
                 type="password"></Input>
           { <div className={error ? "alert alert-danger" : ''} role="alert">
             {error} </div>}
          <div className="text-center">
            <ButtonWithProgress disabled={wait || !username || !password} onClick={onClickLogin}
                                text={t("Login")} wait={wait}>
            </ButtonWithProgress>
          </div>
        </form>
      </div>
    )
}

const mapStateToProps=(store)=>{
  return{
    isLoggedin: store.isLoggedin
    }
}

//Potansiyel bütün propsları diğer high order compenantlara paslamamız lazım yoksa sırası önemli patlayabilir.
const UserLoginPageWithApiProgress = withApiProgress(UserLoginPage,"api/1.0/auth")
const UserLoginPageWithTranslation = withTranslation()(UserLoginPageWithApiProgress)
const UserLoginPageWithConnect = connect(mapStateToProps)(UserLoginPageWithTranslation)
export default UserLoginPageWithConnect;
