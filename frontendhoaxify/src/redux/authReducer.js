import * as ACTIONS from "./Constants"

const defaultState={
  username:undefined,
  isLoggedin: false,
  displayName:undefined,
  image:undefined,
  password:undefined
}
const authReducer =(state={...defaultState},action)=>{
    if(action.type===ACTIONS.LOGOUT_SUCCESS){
      return defaultState;
    }
    if(action.type===ACTIONS.LOGIN_SUCCESS){
      const authState={...action.authState,isLoggedin: true}
      return authState;
    }
    return state;
  };
export default authReducer;