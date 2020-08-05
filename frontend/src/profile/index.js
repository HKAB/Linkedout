import React from 'react';

import { ProfileTabStudent } from "@/profile/student/ProfileTabStudent";
import { ProfileTabCompany } from "@/profile/company/ProfileTabCompany";
import { MyHeader } from "@/components"
import { Layout, Spin } from 'antd';
import { accountServices } from "@/services"


function Profile() {

	// const user = accountServices.userValue;

	// var profileRender = (<Spin></Spin>);
	// if (user)
	// {
	// 	if (user.account.account_type == "student")
	// 		profileRender = (<ProfileTabStudent/>);
	// 	else
	// 		profileRender = (<ProfileTabCompany/>);

	return (
		<Layout>
			<MyHeader />
			<Layout>
				{/* {profileRender} */}
				<ProfileTabStudent />
			</Layout>
		</Layout>
	);
	// }
	// return (
	// 	<Spin></Spin>
	// );
}

export { Profile }