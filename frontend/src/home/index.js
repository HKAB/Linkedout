import React from 'react';

import { accountServices } from "@/services"

function Home() {

	const user = accountServices.userValue;

	return (
		<div>
			<h1>Hi {user ? user.account.username : "Guest, check this out!"}</h1>
			<iframe width="1000" height="500" src="https://www.youtube.com/embed/VR7SZhJ98Cc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
	);
}

export { Home };