import { PageHeader, Row, Form, Input } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
import React from 'react';
export default function home() {
  return (
    <PageHeader title="首页">
      <Row>
        <Title>这里是思之社区</Title>
      </Row>
    </PageHeader>
  );
}
