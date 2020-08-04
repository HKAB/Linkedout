import React from "react";
import { Component } from "react";
import {
  EditOutlined,
  SettingOutlined
} from "@ant-design/icons";

import {
  Tag,
  Card,
  Button,
  Modal
} from "antd";
import Meta from "antd/lib/card/Meta";


import { List, Avatar } from "antd";

import { studentServices } from "@/services";
import { accountServices } from "@/services";
import dayjs from "dayjs";
import moment from 'moment';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import Markdown from 'braft-extensions/dist/markdown'
import Form from "antd/lib/form/Form";

const jobs = [
	{
		title: "Tuyển Dev tại facebook.wap.sh",
		seniority_level: "Junior",
		employment_type: "Full time",
		cities: "Hà Nội",
		skills: ["Python", "C++", "C#", "Java", "Coffee"],
		description: ""
	},
	{
		title: "Tuyển Dev tại facebook.wap.sh",
		seniority_level: "Mid level",
		employment_type: "Part time",
		cities: "Hà Nội",
		skills: ["Python", "C++", "C#", "Java", "Coffee"],
		description: ""
	},
	{
		title: "Tuyển Dev tại facebook.wap.sh",
		seniority_level: "Fresher",
		employment_type: "Remote",
		cities: "Hà Nội",
		skills: ["Python", "C++", "C#", "Java", "Coffee"],
		description: ""
	}
]


BraftEditor.use(Markdown());

class ProfileChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible: false
    };
  }

  componentDidMount() {
    studentServices.studentObject.subscribe((student) => {
      if (student) {

      }
    });
  }

  handleCancel = (e) => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <>
        <Card style={{ marginTop: 24 }} title="Mô tả">
        <BraftEditor
            language="en"
        />
        </Card>

        <Card          
				style={{
					marginTop: 24,
				}}>
				<Meta title="Việc làm"></Meta>
					<List
						grid={{gutter: 24, column: 2}}
						dataSource={jobs}
						renderItem={item => (
							<List.Item>
							<Card 
								style={{marginTop: 16 }}
								actions={[
								<SettingOutlined key="setting" />,
								<EditOutlined key="edit" />,
								]}
							>
								<Meta 
									avatar={<Avatar src="https://image.flaticon.com/icons/svg/3198/3198832.svg"></Avatar>}
									title={item.title}
									description={<div>
										<div>Yêu cầu: {item.seniority_level}</div>
										<div>Địa điểm: {item.cities}</div>
										<div>Công việc: {item.employment_type}</div>
									<List dataSource={item.skills} renderItem={skill => (<Tag>{skill}</Tag>)}></List>
									</div>}
								/>
							</Card>
							</List.Item>
						)}>
					</List>
          <Button  style={{float: "right"}} size="large" type="primary" shape="circle">+</Button>
			</Card>
      </>
    );
  }
}

export default ProfileChange;
