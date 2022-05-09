import { PageHeader, Row, Form, Input } from 'antd';
import React from 'react';
export default function myDefine() {
  return (
    <PageHeader title="我的定文" subTitle="这里帮助你定义自己的思之定文">
      <Form>
        <Row>
          <Form.Item label="myDefineUrl">
            <Input size="large" />
          </Form.Item>
        </Row>
      </Form>
      <Row>
        这里是从url获取的内容 <br />
        1. 基本信息 <br />
        2. published 的<br />
        3. followed feeds
      </Row>
    </PageHeader>
  );
}
