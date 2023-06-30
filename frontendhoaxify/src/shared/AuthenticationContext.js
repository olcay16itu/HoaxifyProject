import React, {Component} from 'react';

export const Authentication= React.createContext()
class AuthenticationContext extends Component {
  state={
    username:undefined,
    isLoggedin: false,
    displayName:undefined,
    image:undefined,
    password:undefined
  }

  onLoginSuccess= authState=> {
    this.setState({
      ...authState,
      isLoggedin:true
    })
  }
  onLogoutSuccess= ()=>{
    this.setState({
      username:undefined,
      isLoggedin:false
    })
  }
  render() {
    return (
      <Authentication.Provider value={{state:{...this.state},
      onLoginSuccess:this.onLoginSuccess,
      onLogoutSuccess:this.onLogoutSuccess}}>
        {this.props.children}
      </Authentication.Provider>
    );
  }
}

export default AuthenticationContext;