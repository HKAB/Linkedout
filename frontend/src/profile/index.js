import { MyHeader } from "@/components";
import { ProfileTabCompany } from "@/profile/company/ProfileTabCompany";
import { ProfileTabStudent } from "@/profile/student/ProfileTabStudent";
import { accountServices } from "@/services";
import { Layout, Spin } from 'antd';
import React from 'react';
import './assets/css/profile.css';

function Profile() {
  const user = accountServices.userValue;
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
