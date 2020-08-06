import React from 'react';

import { createFromIconfontCN } from '@ant-design/icons';

const MyIconz = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1989743_kh2tp4lno6.js', // my freakin china font :)
});

class MyIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.type);
    return (

      <MyIconz type={this.props.type}></MyIconz>
    )
  }
}

export { MyIcon };