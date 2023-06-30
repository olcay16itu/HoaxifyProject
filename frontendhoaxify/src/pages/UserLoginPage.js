import React from "react";
import Input from '../components/Input'
import {withTranslation} from "react-i18next";
import {ChangeLanguage} from "../api/apiCalls";
import {login} from "../api/apiCalls";
import ButtonWithProgress from "../components/ButtonWithProgress";
import {withApiProgress} from "../shared/ApiProgress";
import {Navigate} from "react-router-dom";


class UserLoginPage extends React.Component {

  state = {
    username: null,
    password: null,
    error: null,
    redirect:false
  }

  onClickLogin = async event => {
    event.preventDefault();
    this.setState({error: null})

    const {username, password} = this.state
    const{onLoginSuccess}=this.props
    const creds = {
      username: username,
      password: password
    }
    try {
      this.setState({error: null})
      await login(creds)
      await onLoginSuccess(username)
    } catch (error) {
      this.setState({error: error.response.data.message})
    }

  }



  onChangeEvent = event => {
    const {name, value} = event.target;
    const errors = {...this.state.errors}
    errors[name] = undefined
    this.setState({[name]: value, errors})
    this.setState({error: null})
  }
  onChangeLanguage = language => {
    const {i18n} = this.props;
    i18n.changeLanguage(language)
    ChangeLanguage(language)
  }

  render() {
    const {t,wait,isLoggedin} = this.props;
    const {error, username, password} = this.state
    return (
      <div className="container">
        <form>
          {isLoggedin && <Navigate to={"/"}/>}
          <h1 className="text-center"> {t('Login')}</h1>
          <Input label={t("Username")} name="username" onChange={this.onChangeEvent}></Input>
          <Input label={t("Password")} name="password" onChange={this.onChangeEvent}
                 type="password"></Input>
          {this.state.error && <div className={error ? "alert alert-danger" : ''} role="alert">
            {error} </div>}
          <div className="text-center">
            <ButtonWithProgress disabled={wait || !username || !password} onClick={this.onClickLogin}
                                text={t("Login")} wait={wait}>
            </ButtonWithProgress>
          </div>
        </form>
      </div>
    )
  }
}
//Potansiyel bütün propsları diğer high order compenantlara paslamamız lazım yoksa sırası önemli patlayabilir.
const UserLoginPageWithApiProgress = withApiProgress(UserLoginPage,"api/1.0/auth")
const UserLoginPageWithTranslation = withTranslation()(UserLoginPageWithApiProgress)

export default UserLoginPageWithTranslation;
