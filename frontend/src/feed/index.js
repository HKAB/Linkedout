import React from 'react';

import { MyHeader } from "@/components"
import { Layout } from 'antd';

import { GodDamnPositionFixedStuff } from './GodDamnPositionFixedStuff';

function Feed() {
	return (
		<Layout>
			<MyHeader />
			<Layout>
				<GodDamnPositionFixedStuff />
			</Layout>
		</Layout>
	);
}

export { Feed }