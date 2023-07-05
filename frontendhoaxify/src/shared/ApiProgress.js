import React, { useEffect, useState} from 'react';
import axios from "axios";



export const useApiProgress=(apiPath)=>{
  const [wait,setWait]=useState(false)
  useEffect(()=>{
    let requestinterceptor
    let responseinterceptor
    const updateApiCallFor=(url,inProgress)=>{
      if(url.includes(apiPath)){
        setWait(inProgress)
      }
    }
    const registerInterceptors=()=>{
      requestinterceptor = axios.interceptors.request.use((request) => {
          updateApiCallFor(request.url,true)
          return request;
      })
      responseinterceptor=axios.interceptors.response.use((response) => {
          updateApiCallFor(response.config.url,false)
          return response;
      }, (error) => {
          updateApiCallFor(error.config.url,false)
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
  })
  return wait;
}

