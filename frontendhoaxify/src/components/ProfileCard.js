import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import ProfileimageWithDefault from "./ProfileimageWithDefault";
import Input from "./Input";
import {updateUser} from "../api/apiCalls";
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";

const ProfileCard = (props) => {
  const {username: loggedinusername} = useSelector((store) => {
    return {
      username: store.username
    }
  })
  const [updatedDisplayname, setUpdatedDisplayname] = useState()
  const [isEditMode, setIsEditMode] = useState(false)
  const params = useParams()
  const {username: currentuser} = params
  const [user,setUser]=useState({})
  const[newImage,setNewImage]=useState()
  const[validationErrors,setvalidationErrors]=useState({})

  useEffect(()=>{
    setUser(props.user)
  },[props.user])

  const {username, displayname, image} = user
  const wait = useApiProgress('put', "api/1.0/users/" + username)
  const onClickSave = async () => {
    let image;
    if(newImage){
      image=newImage.split(",")[1]
    }

    try {
      const response = await updateUser(username, {
        displayname: updatedDisplayname,
        image:image
      })
      setIsEditMode(false)
      setUser(response.data)
    } catch (e) {
      setvalidationErrors(e.response.data.validationErrors)
    }
  }
  const onChangeFile=(event)=>{
    if(event.target.files.length<1){
      return;
    }
    const file = event.target.files[0]
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onloadend=()=>{
      setNewImage(fileReader.result)
    }
  }
  useEffect(()=>{
    setvalidationErrors((previousValidationErrors)=>{
      return {
        ...previousValidationErrors,
        displayname:undefined
      }
    })
  },[updatedDisplayname])
  useEffect(()=>{
    setvalidationErrors((previousValidationErrors)=>{
      return {
        ...previousValidationErrors,
        image:undefined
      }
    })
  },[newImage])

  useEffect(() => {
    if (!isEditMode) {
      setUpdatedDisplayname(undefined)
      setNewImage(undefined)
    } else {
      setUpdatedDisplayname(displayname)
    }
  }, [isEditMode, displayname])
  return (
    <div className="card">
      <div className="card-header text-center">
        <ProfileimageWithDefault className={"rounded-circle"} image={image} alt={`${username} profile`}
                                 width={"240"} height={"240"} username={username}
                                 displayname={displayname} tempimage={newImage}></ProfileimageWithDefault>
      </div>
      <div className="card-body text-center">
        {!isEditMode &&
          <div>
            <h3>{displayname}@{username}</h3>
            {loggedinusername===user.username &&<button className="btn btn-success d-inline-flex" onClick={() => {
              setIsEditMode(true)
            }}> <span className="material-icons">
          edit
        </span>Edit
            </button>
          }
          </div>}
        {isEditMode  &&
          <div>
            <Input label={"Change Displayname"} defaultValue={displayname} error={validationErrors.displayname}
                   onChange={event => {setUpdatedDisplayname(event.target.value)}}></Input>
            <Input type="file" onChange={onChangeFile} error={validationErrors.image}/>
            <div>
              <ButtonWithProgress className="btn btn-primary d-inline-flex" onClick={onClickSave} disabled={wait} wait={wait}
              text={
                <>
                <span
                className="material-icons">
                save
                </span>Save
                </>
              }>
              </ButtonWithProgress>
              <button className="btn btn-light d-inline-flex ms-1" onClick={() => setIsEditMode(false)} disabled={wait}><span
                className="material-icons">
            close
            </span>Cancel
              </button>
            </div>
          </div>
        }
      </div>


    </div>
  )
};


export default ProfileCard;