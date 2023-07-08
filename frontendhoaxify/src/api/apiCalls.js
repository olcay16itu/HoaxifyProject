
import axios from "axios"

export const signup =(body)=>{
    return axios.post('api/1.0/users',body)
}

export const login = creds =>{
     return axios.post('api/1.0/auth',{},{auth:creds})
}

export const getAllUsers = (page=0,size=3)=>{
  return axios.get(`api/1.0/users?page=${page}&size=${size}`)
}

export const ChangeLanguage = language =>{
    axios.defaults.headers['accept-language'] = language;
}

export const setAuthorizationHeader=({username,password,isLoggedin})=>{
  if(isLoggedin){
    const authorizationheadervalue=`Basic ${btoa(username+":"+password)}`
    axios.defaults.headers['Authorization']=authorizationheadervalue
  }else{
    delete axios.defaults.headers['Authorization']
  }

}

export const getUser=(username)=>{
  return axios.get(`/api/1.0/users/${username}`)
}

export const updateUser=(username,body)=>{
  return axios.put(`/api/1.0/users/${username}`,body)
}
