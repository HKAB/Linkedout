import { Layout, Spin } from 'antd';
import { MyHeader } from "components";
import { ProfileTabCompany } from "profile/company/ProfileTabCompany";
import { ProfileTabStudent } from "profile/student/ProfileTabStudent";
import React from 'react';
import { accountServices } from "services";
import './assets/css/profile.css';
import {
  useParams
} from 'react-router-dom'


function Profile(props) {
  const user = accountServices.userValue;

  // let { defaultTab } = useParams();
  // console.log(props.location.defaultTab);

  var profileRender = (<Spin></Spin>);
  if (user) {
    if (user.account.account_type == "student")
      profileRender = (<ProfileTabStudent />);
    else
      profileRender = (<ProfileTabCompany />);
    return (
      <Layout>
        <MyHeader />
        <Layout>
          {profileRender}
          {/* <ProfileTabCompany /> */}
          {/* <ProfileTabStudent /> */}
        </Layout>
      </Layout>
    );
  }
  return (
    <Spin></Spin>
  );
}

export { Profile };
