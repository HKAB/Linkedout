import { Layout } from 'antd';
import { MyHeader } from "components";
import React from 'react';
import { GodDamnPositionFixedStuff } from './GodDamnPositionFixedStuff';



function Feed() {
  return (
    <Layout>
      <MyHeader />
      <Layout>
        <GodDamnPositionFixedStuff />
      </Layout>
    </Layout>
  );
}

export { Feed };
