import React, {Component} from 'react';
import axios from "axios";
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
      this.requestinterceptor = axios.interceptors.request.use((request) => {
        if(this.checkPath(request.url)){
          this.setState({wait: true})
        }
        return request;
      })
      this.responseinterceptor=axios.interceptors.response.use((response) => {
        if(this.checkPath(response.config.url)){
          this.setState({wait: false})
        }
        return response;

      }, (error) => {
        if(this.checkPath(error.config.url)){
          this.setState({wait: false})
        }
        throw error;

      })
    }
    //Memory Leak oluşturucak bir durum bu nedenle lfc component will unmount önemli.3 adet lfc durumu var.
    // Component mounting,updating ve unmounting.

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestinterceptor);
      axios.interceptors.response.eject(this.responseinterceptor);
    }

    render() {
      const {wait} = this.state;
      /*return (
        <div>
          {React.cloneElement(this.props.children, {wait:wait})}
        </div>
      );*/
      //Şuan paslamaya gerek yok ancak translation sonra gerçekleşseydi onun propslarını paslamamız gerekirdi.
      return <WrappedComponent wait={wait} {...this.props}/>
    }
  }

}
