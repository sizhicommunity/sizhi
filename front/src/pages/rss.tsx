import { PageHeader, Row, Form, Input, Table } from 'antd';
import React from 'react';
import { Typography } from 'antd';
import { useRequest } from 'ahooks';
import { items } from '../services/service';
import { handleDate } from '@/components/date';
import PageCard from '@/components/PageCard';
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
    render: (time: string) => {
      return <>{handleDate(Date.parse(time))}</>;
    },
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
      <PageCard>
        <Text>{'为有更完整体验，建议使用你喜欢的标准RSS阅读器访问 - '}</Text>
        <Link href="rss://localhost:3000/rss">rss://localhost:3000/rss</Link>
      </PageCard>
      <PageCard>
        <Table columns={columns} dataSource={data} size="small" />
      </PageCard>
    </>
  );
}
