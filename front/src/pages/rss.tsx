import { PageHeader, Row, Form, Input, Table } from 'antd';
import React from 'react';
import { Typography } from 'antd';
import { useRequest } from 'ahooks';
import { items } from '../services/service';
const { Text, Link } = Typography;


const { Title } = Typography;
const columns = [
  
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  
];
export default function rss() {
    const { data, error, loading } = useRequest(items);

  return (
    <>
      <PageHeader title="Rss" subTitle="这里是你所取得的文章，仅作简单展示。" />
      <Row style={{padding:20}}>
        <Text>{"为有更完整体验，建议使用你喜欢的标准RSS阅读器访问 - "}</Text>
        <Link href="rss://localhost:3000/rss">rss://localhost:3000/rss</Link>
      </Row>
      <Table columns={columns} dataSource={data} />;
    </>
  )
}
