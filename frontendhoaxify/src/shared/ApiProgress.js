import React, { useEffect, useState} from 'react';
import axios from "axios";



export const useApiProgress=(apiMethod,apiPath)=>{
  const [wait,setWait]=useState(false)
  useEffect(()=>{
    let requestinterceptor
    let responseinterceptor
    const updateApiCallFor=(method,url,inProgress)=>{
      if(url.includes(apiPath)&&method===apiMethod){
        setWait(inProgress)
      }
    }
    const registerInterceptors=()=>{
      requestinterceptor = axios.interceptors.request.use((request) => {
        const{url,method}=request
        updateApiCallFor(method,url,true)
        return request;
      })
      responseinterceptor=axios.interceptors.response.use((response) => {
        const{url,method}=response.config
        updateApiCallFor(method,url,false)
        return response;
      }, (error) => {
        const{url,method}=error.config
        updateApiCallFor(method,url,false)
        throw error;
      })
    }
    const unregisterInterceptors=()=>{
      axios.interceptors.request.eject(requestinterceptor);
      axios.interceptors.response.eject(responseinterceptor);
    }


    registerInterceptors()
    return function unmount(){
      unregisterInterceptors()
    }
  },[apiMethod,apiPath])
  return wait;
}

