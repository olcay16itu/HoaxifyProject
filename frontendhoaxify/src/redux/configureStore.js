import {createStore,applyMiddleware,compose} from "redux";
import authReducer from "./authReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import {setAuthorizationHeader} from "../api/apiCalls";
const secureLs = new SecureLS();
const getStateFromStorage=()=> {
  let stateinLocalStorage = {
    username: undefined,
    isLoggedin: false,
    displayName: undefined,
    image: undefined,
    password: undefined
  }
  const auth = secureLs.get('auth');
  if (auth) {
    try {
      stateinLocalStorage = auth
    } catch (e) {
    }
    return stateinLocalStorage
  }
}

const updateStateinStorage=(newState)=>{
  return secureLs.set("auth",newState)
}
const ConfigureStore = () => {
  const initialstate= getStateFromStorage()

  //burda state veriyoruz çünkü initial olarak bir state istiyor yoksa undefined tanımlı olur ve diğer kısımlara
// hata döner.Ya da initial olarak function üzerinde default bir değer verilebilir.
  const ComposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
  const store=createStore(authReducer,initialstate,ComposeEnhancers(applyMiddleware(thunk)))


  store.subscribe(()=>{
    updateStateinStorage(store.getState())
    setAuthorizationHeader(store.getState());
  })
  return store;
};

export default ConfigureStore;