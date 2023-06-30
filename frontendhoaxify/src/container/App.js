import React from "react";
import ApiProgress from "../shared/ApiProgress";
import UserSignupPage from "../pages/UserSignupPage";
import LanguageSelector from "../components/LanguageSelector";
import UserLoginPage from "../pages/UserLoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {HashRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import userPage from "../pages/UserPage";
import TopBar from "../components/TopBar";

class App extends React.Component {
  state={
    username:null,
    isLoggedin: false
  }

  onLoginSuccess= async (username)=> {
    this.setState({
      username,
      isLoggedin: true
    })
  }
    onLogoutSuccess= ()=>{
      this.setState({
        username:null,
        isLoggedin:false
      })
  }
  render() {
    const{username,isLoggedin} = this.state
    return (
      <div>
        <Router>
          <TopBar username={username} isLoggedin={isLoggedin} onLogoutSuccess={this.onLogoutSuccess}></TopBar>
          <Routes>
            <Route path="/" Component={HomePage}/>
            {!isLoggedin&&
            <Route path="/login" Component={()=> {
              return <UserLoginPage onLoginSuccess={this.onLoginSuccess} isLoggedin={isLoggedin}/>
            }}/>
            }
            <Route path="/signup" Component={UserSignupPage}/>
            <Route path="/user/:username" Component={(props)=>{return <UserPage {...props} username={username}/>}}/>
            <Route path='*' element={<Navigate to="/" replace={true}/>}/>
          </Routes>
        </Router>
        <LanguageSelector/>
      </div>
    );
  }
}

export default App;
