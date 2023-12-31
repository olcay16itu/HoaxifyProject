import React, { useState} from "react";
import Input from '../components/Input'
import {useTranslation} from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import {useApiProgress} from "../shared/ApiProgress";
import {signUpHandler} from "../redux/authActions";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


const UserSignupPage = (props) => {

  const [form, setForm] = useState({
    username: null,
    displayname: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});
  const dispatch=useDispatch()
  const onChangeEvent = event => {
    const {name, value} = event.target;
    setErrors((previousErrors) => ({...previousErrors, [name]: undefined}));
    setForm((previousForm) => ({...previousForm, [name]: value}));
  }
  const onClickSignUp = async (event) => {
    event.preventDefault()
    const {username, displayname, password} = form
    const body = {
      username: username,
      displayname: displayname,
      password: password
    }
    try {
      await dispatch(signUpHandler(body))

    } catch (error) {
      if (error.response.data.validationErrors) {
        //this.setState({errors: error.response.data.validationErrors})
        setErrors(error.response.data.validationErrors)
      }
    }

  }
  const {isLoggedin}=useSelector((store)=>{
    return{
      isLoggedin: store.isLoggedin
    }
  })
  const {username: usernameError, displayname: displaynameError, password: passwordError} = errors;
  const  waitforLogin = useApiProgress('post',"api/1.0/auth");
  const  waitforSignup=useApiProgress('post',"api/1.0/users")
  const wait = waitforSignup || waitforLogin
  const {t}=useTranslation()
  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = t('Password mismatch');
  }
    return (
      <div className="container">
        {isLoggedin && <Navigate to={"/"}/>}
        <form>
          <h1 className="text-center"> {t('Sign Up')}</h1>
          <Input label={t("Username")} name="username" onChange={onChangeEvent}
                 error={usernameError}></Input>
          <Input label={t("Display Name")} name="displayname" onChange={onChangeEvent} error={displaynameError}></Input>
          <Input label={t("Password")} name="password" onChange={onChangeEvent} error={passwordError}
                 type="password"></Input>
          <Input label={t("Password Repeat")} name="passwordRepeat" onChange={onChangeEvent} error={passwordRepeatError}
                 type="password"></Input>
          <div className="text-center">
            <ButtonWithProgress disabled={wait || passwordRepeatError !== undefined} wait={wait} text={t('Sign Up')}
                                onClick={onClickSignUp}></ButtonWithProgress>
          </div>
        </form>
      </div>
    )
  }

export default UserSignupPage;