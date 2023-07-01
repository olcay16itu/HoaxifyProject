import React from "react";
import ApiProgress from "../shared/ApiProgress";
import UserSignupPage from "../pages/UserSignupPage";
import LanguageSelector from "../components/LanguageSelector";
import UserLoginPage from "../pages/UserLoginPage";
import HomePage from "../pages/HomePage";
import {HashRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import TopBar from "../components/TopBar";
import {connect} from "react-redux";
import userPage from "../pages/UserPage";


class App extends React.Component {
  //static contextType=Authentication
  render() {
    //const{username,isLoggedin} = this.state
    const{isLoggedin}=this.props
    return (
      <div>
        <Router>
          <TopBar/>
          <Routes>
            <Route path="/" Component={HomePage}/>
            {!isLoggedin&&
            <Route path="/login" Component={UserLoginPage}/>}
            <Route path="/signup" Component={UserSignupPage}/>
            <Route path="/user/:username" Component={userPage}/>
            <Route path='*' element={<Navigate to="/" replace={true}/>}/>
          </Routes>
        </Router>
        <LanguageSelector/>
      </div>
    );
  }
}

const mapStateToProps=(store)=>{
  return{
    isLoggedin:store.isLoggedin
  }
}
export default connect(mapStateToProps)(App);
