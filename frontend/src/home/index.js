import React from "react";

import { accountServices } from "@/services";
import { HomeHeader } from "./HomeHeader";
import { Card, Row, Col, Typography, Button, Space, Avatar, Input } from "antd";

import banner from "./assets/images/banner.svg";
import woman from "./assets/images/woman.svg";
import mancoding from "./assets/images/mancoding.svg";

import Meta from "antd/lib/card/Meta";

import acer from "./assets/images/sponsor/acer.svg";
import canon from "./assets/images/sponsor/canon.svg";
import cisco from "./assets/images/sponsor/cisco.svg";
import samsung from "./assets/images/sponsor/samsung.svg";
import sony from "./assets/images/sponsor/sony.svg";

import CV from "./assets/images/CV.svg";
import findjob from "./assets/images/findjob.svg";
import communication from "./assets/images/communication.svg";
import blacklivematter from "./assets/images/blacklivematter.svg";
import subscribemail from "./assets/images/subscribemail.svg";

import { DonutChart, BarChart } from "bizcharts";
import QueueAnim from "rc-queue-anim";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

const { Title } = Typography;

const data = [
	{ type: "C++", value: 502 },
	{ type: "C#", value: 635 },
	{ type: "Nodejs", value: 163 },
	{ type: "Python", value: 203 },
];

const data_comment = [
	{
		avatar: "https://image.flaticon.com/icons/svg/3220/3220298.svg",
		title: "Ivan Konev",
		description:
			"The 2nd Red Banner Army was a Soviet field army of World War II that was formed at Khabarovsk in the Soviet Far East in July 1938. It spent most of the war guarding the border in the Blagoveshchensk area, sending formations to the Eastern Front while undergoing several reorganizations.",
	},

	{
		avatar: "https://image.flaticon.com/icons/svg/3220/3220298.svg",
		title: "Ivan Konev",
		description:
			"The 2nd Red Banner Army was a Soviet field army of World War II that was formed at Khabarovsk in the Soviet Far East in July 1938. It spent most of the war guarding the border in the Blagoveshchensk area, sending formations to the Eastern Front while undergoing several reorganizations.",
	},

	{
		avatar: "https://image.flaticon.com/icons/svg/3220/3220298.svg",
		title: "Ivan Konev",
		description:
			"The 2nd Red Banner Army was a Soviet field army of World War II that was formed at Khabarovsk in the Soviet Far East in July 1938. It spent most of the war guarding the border in the Blagoveshchensk area, sending formations to the Eastern Front while undergoing several reorganizations.",
	},
];

function Home({history}) {
	const sponsor = [acer, canon, cisco, samsung];
	const sponsor_children = sponsor.map((d, i) => (
		<QueueAnim
			component={Col}
			key={i}
			type="bottom"
			componentProps={{ span: 4, offset: 1 }}
		>
			<img src={d} width={"128"} height={"128"}></img>
		</QueueAnim>
	));

	const comments = data_comment.map((d, i) => (
		<QueueAnim
			component={Col}
			key={i}
			type="bottom"
			componentProps={{ span: 6, offset: 1 }}
		>
			<Card >
				<Card.Meta
					key={i}
					avatar={<Avatar src={d.avatar} />}
					title={d.title}
					description={d.description}
				/>
			</Card>
		</QueueAnim>
	));

	const user = accountServices.userValue;
	return (
		<>
			<HomeHeader></HomeHeader>

			<Card bordered={false}>
				<div
					style={{
						backgroundColor: "#1890ff",
						position: "relative",
						minWidth: "80vw",
						minHeight: "80vh",
					}}
				>
					{/* <img src={banner} width="100%" height="100%"></img> */}
					{/* <Row> */}
					<QueueAnim key="content" component={Row}>
						<QueueAnim
							delay={300}
							component={Col}
							key="col1"
							componentProps={{
								span: 10,
								offset: 1,
								style: { position: "relative" },
							}}
							type="left"
						>
							<img
								key="woman"
								src={woman}
								width="100%"
								style={{ position: "absolute", top: "10vh" }}
							></img>
						</QueueAnim>
						<QueueAnim
							type="right"
							key="col2"
							component={Col}
							delay={300}
							ease="easeOutQuart"
							componentProps={{ key: "2", span: 11, offset: 1 }}
						>
							<div
								className="banner-content"
								style={{ marginTop: "10vh " }}
							>
								<div
									key="demo1"
									style={{
										fontFamily: "sans-serif",
										fontSize: 60,
										fontWeight: "bold",
										color: "white",
									}}
								>
									CREATE AMAZING CV.
								</div>
								<div
									key="demo2"
									style={{
										fontFamily: "sans-serif",
										fontSize: 60,
										fontWeight: "bold",
										color: "white",
									}}
								>
									FIND YOUR PARTNER.
								</div>
								<div
									key="demo3"
									style={{
										fontFamily: "sans-serif",
										fontSize: 30,
										color: "white",
									}}
								>
									Individuals and interactions over processes
									and tools Working software over
									comprehensive documentation Customer
									collaboration over contract negotiation
									Responding to change over following a plan
								</div>
								<Button
									key="demo4"
									type="primary"
									danger
									size="large"
									style={{
										float: "right",
										// marginRight: 128,
										marginTop: 32,
										fontSize: 30,
										height: 64,
										textAlign: "center",
										verticalAlign: "middle",
										padding: "10px"
									}}
									href="https://youtu.be/dQw4w9WgXcQ"
								>
									Get started now!
								</Button>
							</div>
						</QueueAnim>
						<QueueAnim
							key="col3"
							component={Col}
							componentProps={{ key: "3", span: 1 }}
						></QueueAnim>
					</QueueAnim>
				</div>
			</Card>

			<Card bordered={false}>
				<div style={{ height: "20vh" }}>
					<OverPack className="home-layout" playScale={0.1}>
						<div
							style={{
								width: "100%",
								textAlign: "center",
								fontFamily: "sans-serif",
								fontSize: 20,
								fontWeight: "bold",
								marginTop: 64,
							}}
						>
							THEY TRUST US
						</div>
						{/* <Row justify="center" align="middle"> */}
						<QueueAnim
							delay={300}
							key="sponsor-content"
							component={Row}
							type="bottom"
							componentProps={{
								justify: "center",
								align: "middle",
							}}
						>
							{sponsor_children}
							{/* <Col key="c1" span={5} offset={2}><img src={acer}  width={"128"} height={"128"}></img></Col>
						<Col key="c2"  span={4} offset={1}><img src={canon}   width={"128"} height={"128"} ></img></Col>
						<Col key="c3" span={4} offset={1}><img src={cisco}   width={"128"} height={"128"} ></img></Col>
						<Col key="c4" span={5} offset={2}><img src={samsung}   width={"128"} height={"128"} ></img></Col> */}
						</QueueAnim>
						{/* </Row> */}
					</OverPack>
				</div>
			</Card>

			<Card bordered={false}>
				<QueueAnim delay={300}>
					<OverPack playScale={0.4}>
						<div
							key="banner2"
							style={{
								backgroundColor: "#bdc3c7",
								position: "relative",
								minWidth: "80vw",
								minHeight: "80vh",
							}}
						>
							<Row>
								<Col span={10} offset={1}>
									<QueueAnim delay={50}>
										<img
											key="img_mancoding"
											src={mancoding}
											style={{
												height: "60vh",
												marginTop: "10vh",
											}}
										></img>
									</QueueAnim>
								</Col>
								<Col span={11} offset={1}>
									<div
										className="banner-content"
										style={{ marginTop: "15vh " }}
									>
										<QueueAnim delay={50}>
											<div
												key="header"
												style={{
													fontFamily: "sans-serif",
													fontSize: 30,
													fontWeight: "bold",
												}}
											>
												We developed useful feature for
												you
											</div>
										</QueueAnim>
										<Row style={{ marginTop: 64 }}>
											<Col span={12}>
												<Space>
													<QueueAnim delay={300} type="top">
														<img
															key="img_communication"
															src={CV}
															style={{
																height: "64",
																width: "64",
															}}
														></img>
														<span
															key="title"
															style={{
																fontFamily:
																	"sans-serif",
																fontSize: 20,
															}}
														>
															Build your CV
														</span>
													</QueueAnim>
												</Space>
											</Col>
											<Col span={12}>
												<Space>
													<QueueAnim delay={300} type="top">
														<img
															key="img_findjob"
															src={findjob}
															style={{
																height: "64",
																width: "64",
															}}
														></img>
														<span
															key="title"
															style={{
																fontFamily:
																	"sans-serif",
																fontSize: 20,
															}}
														>
															Find a job
														</span>
													</QueueAnim>
												</Space>
											</Col>
										</Row>
										<Row style={{ marginTop: 64 }}>
											<Col span={12}>
												<Space>
													<QueueAnim delay={300} type="bottom">
														<img
															key="img_communication"
															src={communication}
															style={{
																height: "64",
																width: "64",
															}}
														></img>
														<span
															key="title"
															style={{
																fontFamily:
																	"sans-serif",
																fontSize: 20,
															}}
														>
															Connect to company
														</span>
													</QueueAnim>
												</Space>
											</Col>
											<Col span={12}>
												<Space>
													<QueueAnim delay={300} type="bottom">
														<img
															key="img_blacklivematter"
															src={
																blacklivematter
															}
															style={{
																height: "64",
																width: "64",
															}}
														></img>
														<span
															key="title"
															style={{
																fontFamily:
																	"sans-serif",
																fontSize: 20,
															}}
														>
															Find your partner
														</span>
													</QueueAnim>
												</Space>
											</Col>
										</Row>
									</div>
								</Col>
								<Col span={1}></Col>
							</Row>
						</div>
					</OverPack>
				</QueueAnim>
			</Card>

			<Card key="statistic" bordered={false}>
				<QueueAnim delay={300}>
					<OverPack playScale={0.4}>
						<div style={{ minHeight: "50vh" }}>
							<div
								key="chart"
								style={{
									width: "100%",
									textAlign: "center",
									fontFamily: "sans-serif",
									fontSize: 20,
									fontWeight: "bold",
									marginTop: 64,
								}}
							>
								STATISTIC
							</div>

							<Row>
								<Col span={12}>
									<div>
										<DonutChart
											key="donut"
											data={data}
											title={{
												visible: true,
											}}
											meta={{
												value: {
													alias:
														"Cũng như bên cạnh, nhưng hình tròn",
													// formatter:(v)=>{return `${v}个`}
												},
											}}
											// highlight-end
											angleField="value"
											colorField="type"
											legend={{
												position: "left-center",
											}}
											statistic={{
												totalLabel: "Tổng",
											}}
										/>
									</div>
								</Col>

								<Col span={12}>
									<div>
										<BarChart
											key="bar"
											data={data}
											title={{
												visible: true,
											}}
											meta={{
												value: {
													alias: " ",
													formatter: (v) => {
														return `${v}`;
													},
												},
											}}
											// highlight-end
											xField="value"
											yField="type"
											colorField="type"
										/>
									</div>
								</Col>
							</Row>
						</div>
					</OverPack>
				</QueueAnim>
			</Card>

			<Card bordered={false}>
				<QueueAnim delay={300}>
					<OverPack playScale={0.5}>
						<div
							key="banner"
							style={{
								backgroundColor: "#bdc3c7",
								minWidth: "80vw",
								minHeight: "50vh",
							}}
						>
							<QueueAnim
								key="content"
								component={Row}
								type="bottom"
								componentProps={{
									align: "middle",
									// justify: "center",
									style: { height: "40vh" },
								}}
							>
								<div
									style={{
										width: "100%",
										textAlign: "center",
										fontFamily: "sans-serif",
										fontSize: 20,
										fontWeight: "bold",
										// marginTop: 16,
									}}
								>
									WHAT THEY THINK ABOUT US
								</div>
								<Col span={1}></Col>
								{comments}
								<Col span={1}></Col>
							</QueueAnim>
						</div>
					</OverPack>
				</QueueAnim>
			</Card>

			{/* <OverPack playScale={0.5}> */}
				<Card bordered={false}>
				<QueueAnim delay={300}>
				<OverPack playScale={0.2}>
					<div style={{minHeight: "30vh"}}>
					<QueueAnim delay={300}>
					<div
						key="title"
						style={{
							fontFamily: "sans-serif",
							fontSize: 40,
							marginTop: 16,
							marginLeft: "10vw",
						}}
					>
						Not ready to get start?
					</div>
					</QueueAnim>
					<Row style={{ marginTop: "10vh" }}>
						<Col
							span={10}
							offset={7}
							style={{ textAlign: "center" }}
						>
							<QueueAnim delay={300}>
								<Input
									key="input"
									size="large"
									placeholder="Your email here!"
								></Input>
								<Button
									key="button"
									style={{ marginTop: 32 }}
									type="primary"
									shape="round"
									size="large"
								>
									Spam me
								</Button>
							</QueueAnim>
						</Col>
					</Row>
					</div>
					
					</OverPack>
					</QueueAnim>
				</Card>
				<img key="image" src={subscribemail} style={{width: "100vw"}}></img>
		</>	
	);
}

export { Home };
