import React from "react";
import Input from '../components/Input'
import {withTranslation} from "react-i18next";
import {ChangeLanguage} from "../api/apiCalls";
import {login} from "../api/apiCalls";

class UserLoginPage extends React.Component {

  state = {
    username: null,
    password: null,
    disablebuttononstart: true,
    wait: false,
    errors: {}
  }

  onClickLogin=event=>{
    event.preventDefault();
    const {username,password}=this.state
    const creds={
      username:username,
      password:password
    }
    login(creds)
  }
  onChangeEvent = event => {
    const {name, value} = event.target;
    const errors = {...this.state.errors}
    errors[name] = undefined
    this.setState({[name]: value, errors})
  }
    onChangeLanguage = language => {
      const {i18n} = this.props;
      i18n.changeLanguage(language)
      ChangeLanguage(language)
    }

    render()
    {
      const {wait, errors,disablebuttononstart} = this.state
      const {username, password} = errors;
      const {t} = this.props;
      return (
        <div className="container">
          <form>
            <h1 className="text-center"> {t('Login')}</h1>
              <Input label={t("Username")} name="username" onChange={this.onChangeEvent} error={username}></Input>
              <Input label={t("Password")} name="password" onChange={this.onChangeEvent} error={password}
               type="password"></Input>
            <div className="text-center">
              <button disabled={wait} className="btn btn-primary mb-3"
                      onClick={this.onClickLogin}>{
                wait && <span disabled={wait} className="spinner-border spinner-border-sm" role="status"
                              aria-hidden="true"></span>
              }{t('Login')}
              </button>
            </div>
          </form>
        </div>
      )
    }
}
const UserLoginPageWithTranslation = withTranslation()(UserLoginPage)
export default UserLoginPageWithTranslation;
