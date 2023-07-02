import React, {Component, useEffect, useState} from 'react';
import axios from "axios";



export const useApiProgress=(apiPath)=>{
  const [wait,setWait]=useState(false)
  useEffect(()=>{
    let requestinterceptor
    let responseinterceptor
    const updateApiCallFor=(url,inProgress)=>{
      if(url===apiPath){
        setWait(inProgress)
      }
    }
    const registerInterceptors=()=>{
      requestinterceptor = axios.interceptors.request.use((request) => {
          updateApiCallFor(request.url,true)
          return request;
      })
      responseinterceptor=axios.interceptors.response.use((response) => {
         updateApiCallFor(response.url,false)
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
  },)
  return wait;
}
function getDisplayName(WrappedComponent){
  return WrappedComponent.displayName||WrappedComponent.name||'Component';
}

export function withApiProgress(WrappedComponent,apiPath){
  return class ApiProgress extends Component {
    static displayName='ApiProgress('+getDisplayName(WrappedComponent)+')'

    state={
      wait:false
    }
    checkPath(url){
      if(url===apiPath) {
        return true;
      }
      else{
        return false;
      }
    }
    componentDidMount() {
      this.registerInterceptors()
    }
    componentWillUnmount() {
      this.unregisterInterceptors()
    }



    //Memory Leak oluşturucak bir durum bu nedenle lfc component will unmount önemli.3 adet lfc durumu var.
    // Component mounting,updating ve unmounting.



    render() {
      const wait = this.state.wait || this.props.wait;
      /*return (
        <div>
          {React.cloneElement(this.props.children, {wait:wait})}
        </div>
      );*/
      //Şuan paslamaya gerek yok ancak translation sonra gerçekleşseydi onun propslarını paslamamız gerekirdi.
      return <WrappedComponent {...this.props} wait={wait} />
    }
  }

}
