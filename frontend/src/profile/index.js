import React from 'react';

import { ProfileSider } from "@/profile/ProfileSider";
import { MyHeader } from "@/components"
import { Layout} from 'antd';



function Profile() {
	return (
		<Layout>
			<MyHeader/>
			<Layout>
				<ProfileSider/>
			</Layout>
		</Layout>
	);
}

export { Profile }