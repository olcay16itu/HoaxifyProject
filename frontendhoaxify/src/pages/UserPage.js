import React from 'react';
import ProfileCard from "../components/ProfileCard";
import {withRouter} from "../shared/withRouter";
const UserPage = (props) => {
  return (
    <div className="container">
      <ProfileCard username={props.params.username}></ProfileCard>
    </div>
  );
};

const UserPagewithParams=withRouter(UserPage)
export default UserPagewithParams;