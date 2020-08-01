import React from 'react';

import { accountServices } from "@/services"

function Home() {

	const user = accountServices.userValue;

	return (
		<div>
			<h1>Hi {user ? user.account.username : "Guest"}</h1>
			<iframe width="1000" height="1000" src="https://www.youtube.com/embed/Ajxj6chgUI4" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullscreen></iframe>
		</div>
	);
}

export { Home };