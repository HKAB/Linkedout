import React from 'react';

import { ProfileTabStudent } from "@/profile/student/ProfileTabStudent";
import { ProfileTabCompany } from "@/profile/company/ProfileTabCompany";
import { MyHeader } from "@/components"
import { Layout, Spin } from 'antd';
import { accountServices } from "@/services"


function Profile() {
<<<<<<< Updated upstream
	
	const user = accountServices.userValue;
=======

	// const user = accountServices.userValue;
>>>>>>> Stashed changes

	var profileRender = (<Spin></Spin>);
	// if (user)
	// {
<<<<<<< Updated upstream
	// 	if (user.account.account_type == "student")
	// 		profileRender = (<ProfileTabStudent/>);
	// 	else
	// 		profileRender = (<ProfileTabCompany/>);
=======
	// if (user.account.account_type == "student")
	// 	profileRender = (<ProfileTabStudent/>);
	// else
	// 	profileRender = (<ProfileTabCompany/>);
>>>>>>> Stashed changes

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