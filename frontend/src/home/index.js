import React from 'react';

import { accountServices } from "@/services"
import { HomeHeader } from './HomeHeader'
import { Card, Row, Col } from 'antd';

import banner from "./assets/images/banner.svg"
import woman from "./assets/images/woman.svg"

function Home() {

	const user = accountServices.userValue;

	return (
		// <div>
		// 	<h1>Hi {user ? user.account.username : "Guest, check this out!"}</h1>
		// 	<iframe width="1000" height="500" src="https://www.youtube.com/embed/VR7SZhJ98Cc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		// </div>
		<>
		<HomeHeader></HomeHeader>
		<Card bordered={false}>
			<div style={{backgroundColor: "#1890ff"}}>
				{/* <img src={banner} width="100%" height="100%"></img> */}
				<Row>
					<Col span={10}>
						<img src={woman} width="90%" height="100%" style={{}}></img>
					</Col>
				</Row>
			</div>
		</Card>
		</>
	);
}

export { Home };