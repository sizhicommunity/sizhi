import { PageHeader, Row, Form, Input } from 'antd';
import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function rss() {
  return (
    <PageHeader
      title="Rss"
      subTitle="从这里取得标准rss条目，用你喜欢的标准RSS阅读器阅读。"
    >
      <Form>
        <Row>
          <Form.Item>
            <Title level={3}>rss://localhost:3000/rss</Title>
          </Form.Item>
        </Row>
      </Form>
    </PageHeader>
  );
}
