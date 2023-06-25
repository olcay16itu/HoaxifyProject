
import React from "react";
import {signup} from "../api/apiCalls"
import Input from '../components/Input'

class UserSignupPage extends React.Component{
 
    state={
      username:null,
      displayname:null,
      password:null,
      passwordRepeat:null,
      wait:false,
      errors:{}
    };
    
    onChangeEvent=event=>{
      const{name,value} = event.target;
      const errors={...this.state.errors}
      errors[name]= undefined
      if(name === 'password'|| name==='passwordRepeat'){
        if(name==='password' && value!==this.state.passwordRepeat){
          errors.passwordRepeat='Şifreler eşleşmiyor.'
        }
        else if(name==='passwordRepeat' && value!==this.state.password){
          errors.passwordRepeat="Şifreler eşleşmiyor."
        }else{
          errors.passwordRepeat=undefined;
        }
      }
      this.setState({[name]:value,errors})
    }    

    onClickSignUp=async(event)=>{
      event.preventDefault()
      this.setState({wait:true})
      const{username,displayname,password} = this.state
      const body={
        username:username,
        displayname:displayname,
        password:password
      }
    /*   signup(body)
      .then((response)=>{
        this.setState({wait:false})
      }).catch(((error)=>{
        this.setState({wait:false})
      })); */
      try{
        const response=await signup(body)
      }catch(error){
        console.log(error)
        if(error.response.data.validationErrors){
          this.setState({errors:error.response.data.validationErrors})
        }
        
      }
      this.setState({wait:false})

    }
    
    render(){
      const {wait,errors} = this.state
      const {username,displayname,password,passwordRepeat} = errors;
       return (
      <div className="container">
        <form>
         <h1 className="text-center"> Sign Up</h1>
           <Input label="Username" name="username" onChange={this.onChangeEvent} error={username}></Input>
           <Input label="DisplayName" name="displayname" onChange={this.onChangeEvent} error={displayname}></Input>
           <Input label="Password" name="password" onChange={this.onChangeEvent} error={password} type="password"></Input>
           <Input label="Password Repeat" name="passwordRepeat" onChange={this.onChangeEvent} error={passwordRepeat} type="password"></Input>
           {/*<div className="mb-3">
           <label>Password</label>
           <input className="form-control" name="password" type="password" onChange={this.onChangeEvent}></input>    
       </div>*/}
         {/*<div className="mb-3">
           <label>Re-Password</label>
           <input className="form-control" name="repassword" type="password" onChange={this.onChangeEvent}></input>
      </div>*/}
         {/* <div className="mb-3">
          <label>DisplayName</label>
          <input className="form-control" name="displayname" onChange={this.onChangeEvent}></input>
          <div className="invalid-feedback">
            {displayname}
          </div>
         </div>
         <div className="mb-3">
           <label>Password</label>
           <input className="form-control" name="password" type="password" onChange={this.onChangeEvent}></input>    
         </div>
         <div className="mb-3">
           <label>Re-Password</label>
           <input className="form-control" name="repassword" type="password" onChange={this.onChangeEvent}></input>
         </div> */}
         <div className="text-center">
         <button disabled={wait||passwordRepeat!==undefined} className="btn btn-primary mb-3" onClick={this.onClickSignUp}>{
         wait &&<span disabled={wait} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          }Sign Up
         </button>
         </div>
         </form>
       </div>
       )
    }
}
export default UserSignupPage;