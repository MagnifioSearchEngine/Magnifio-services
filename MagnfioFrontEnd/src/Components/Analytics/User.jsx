import React from 'react';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Meta } = Card;

export default function User({ avatar, name, activity }) {
  return (
    <>
      <Card style={{ width: 300, marginTop: 16 }}>
        <Meta
          avatar={<Avatar src={avatar} />}
          title={name}
          description={activity}
        />
      </Card>
    </>
  );
}
