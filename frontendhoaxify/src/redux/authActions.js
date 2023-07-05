import * as ACTIONS from "./Constants"
import { login, signup} from '../api/apiCalls'
export const LogoutSuccess=()=>{
  return {
    type:ACTIONS.LOGOUT_SUCCESS
  }
}

export const LoginSuccess=(authState)=>{
  return{
    type:ACTIONS.LOGIN_SUCCESS,
    authState:{...authState}
  }
}

export const loginHandler=(credentials)=>{
  return async (dispatch)=>{
  const response =  await login(credentials)
  const authState={
    username:response.data.username,
    password:credentials.password,
    displayName:response.data.displayName,
    image:response.data.image,
  }
    dispatch(LoginSuccess(authState))
    return response
   }
}

export const signUpHandler=(body)=>{
  return async (dispatch)=>{
    const response = await signup(body);
    await dispatch(loginHandler(body))
    return response
  }
}