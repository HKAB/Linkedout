import React from 'react';

import { ProfileSider } from "@/profile/ProfileSider";
import { ProfileContent } from "@/profile/ProfileContent";

import { MyHeader } from "@/components"
import { Layout, Menu } from 'antd';
const { Content } = Layout;



function Profile() {
	return (
		<Layout>
			<MyHeader/>
			<Layout>
				<ProfileSider/>
				<Layout style={{ padding: '0 24px 24px' }}>
					<ProfileContent/>
				</Layout>
			</Layout>
		</Layout>
	);
}

export { Profile }