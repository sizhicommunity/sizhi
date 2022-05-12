import PageCard from '@/components/PageCard';
import { useRequest } from 'ahooks';
import { PageHeader, Table, Typography } from 'antd';
const { Text, Link } = Typography;
import { Tag, Space } from 'antd';
import React from 'react';
import { feeds } from '../services/service';
/**
 * defineUrl: string;
  feedPath: string;
  url: string;
 */
const columns = [
  {
    title: 'Url',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Define',
    dataIndex: 'defineUrl',
    key: 'defineUrl',
  },
  {
    title: 'FeedPath',
    dataIndex: 'feedPath',
    key: 'feedPath',
  },
];

export default function feedsPage() {
  const { data, error, loading } = useRequest(feeds);

  return (
    <>
      <PageHeader title="信息源" subTitle="从所有思之定文中获取的信息源" />
      <PageCard>
        <Text>{'可以使用你喜欢的标准RSS阅读器导入信息源 - '}</Text>
        <Link href="http://localhost:3000/opml">http://localhost:3000/opml</Link>
      </PageCard>
      <PageCard>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </PageCard>
    </>
  );
}
