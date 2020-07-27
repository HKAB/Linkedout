import React from 'react';

import { ProfileSider } from "@/profile/ProfileSider";
import { ProfileContent } from "@/profile/ProfileContent";
import  MenuChange  from "@/profile/changeProfile/menuChange";
import  ProfileChange  from "@/profile/ProfileChange";


import { MyHeader } from "@/components"
import { Layout, Menu, Row, Col, Tabs } from 'antd';
const { Content } = Layout;
const { TabPane } = Tabs;


function Profile() {
	return (
		<Layout>
			<MyHeader/>
			<Layout style={{minHeight: "calc(100vh - 55px)"}}>
				<ProfileSider/>
				
				

				{/* <Layout style={{ padding: '0 24px 24px' }}>
					<Row align="middle">
						<Col span={4}></Col>
						<Col span={16}><MenuChange/></Col>
						<Col span={16}><ProfileChange/></Col>
						<Col span={16}><ProfileContent/></Col>
						<Col span={4}></Col>
					</Row>
				</Layout> */}
			</Layout>
		</Layout>
	);
}

export { Profile }