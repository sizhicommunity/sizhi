import { useRequest } from 'ahooks';
import { PageHeader, Table } from 'antd';

import { Tag, Space } from 'antd';
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
      <Table columns={columns} dataSource={data} />;
    </>
  );
}
