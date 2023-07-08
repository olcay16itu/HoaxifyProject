import React, {useEffect, useState} from 'react';
import {getAllUsers} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import UserListitem from "./UserListitem";
import {useApiProgress} from "../shared/ApiProgress";

const UserList = () => {
  const [page,setPage] = useState({content:[],
        number:0,
         size:3
  })
  const [loadFailure,setLoadFailure]=useState(false)
  const pendingApiCall = useApiProgress("get","api/1.0/users?page")
   const onClickNext=()=>{
     let nextPage=page.number+1;
     loadUsers(nextPage)
   }
  const onClickPrev=()=>{
    let prevPage=page.number-1;
    loadUsers(prevPage)
  }
  // componentDidMount() {
  //    this.loadUsers()
  // }
  useEffect(()=>{
    loadUsers()
  },[])

  const loadUsers=async(page)=> {
    setLoadFailure(false)
    try {
      const response = await getAllUsers(page);
      setPage(response.data)
    } catch (error) {
      setLoadFailure(true)
    }
  }
    const {t}=useTranslation()
     const{content:users,last,first}=page
   let actionDiv =(<div>
     <button className="btn btn-sm btn-light float-start" onClick={onClickPrev} disabled={first}>{t("prev")}</button>
     <button className="btn btn-sm btn-light float-end" onClick={onClickNext} disabled={last} >{t("next")}</button>
   </div>)
  if(pendingApiCall){
    actionDiv=(
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  return (
      <div className="card">
        <h3 className="card-header text-center">{t("Users")}</h3>
        <div className="list-group">
        {users.map((user)=>(
         <UserListitem key={user.username} user={user}></UserListitem>
        ))}
        </div>
        {actionDiv}
        {loadFailure&&<div className="text-center text-danger">{t("Load Failure")}</div>}
      </div>
    );
}

export default UserList;