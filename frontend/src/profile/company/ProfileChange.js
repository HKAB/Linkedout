import React from "react";
import { Component } from "react";
import {
  EditOutlined,
} from "@ant-design/icons";

import {
  Skeleton,
  Switch,
  Badge,
  Card,
  Button,
  Timeline,
  Form,
  Input,
  Space,
  DatePicker,
  Modal,
  Popconfirm,
  Empty
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

BraftEditor.use(Markdown());

class ProfileChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  componentDidMount() {
    studentServices.studentObject.subscribe((student) => {
      if (student) {

      }
    });
  }

  render() {
    const controls = [
        'italic', 'underline', 'separator', 'link', 'separator', 'media'
      ]

    return (
      <>
        <Card style={{ marginTop: 24 }}>
        <BraftEditor
            controls={controls}
            language="en"
        />
        </Card>
      </>
    );
  }
}

export default ProfileChange;
