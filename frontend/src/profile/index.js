import React from 'react';

import { ProfileTab } from "@/profile/company/ProfileTab";
import { ProfileSider } from "@/profile/student/ProfileSider";
import { MyHeader } from "@/components"
import { Layout } from 'antd';



function Profile() {
	return (
		<Layout>
			<MyHeader />
			<Layout>
				<ProfileTab />
			</Layout>
		</Layout>
	);
}

export { Profile }