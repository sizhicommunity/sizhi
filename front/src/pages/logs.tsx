import { useRequest } from 'ahooks';
import { PageHeader, Table } from 'antd';

import { Tag, Space } from 'antd';
import { logs } from '../services/service';
const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'TimeStamp',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
  },
];

export default function logsPage() {
  const { data, error, loading } = useRequest(logs);

  return (
    <>
      <PageHeader title="日志" subTitle="显示运行日志" />
      <Table columns={columns} dataSource={data} />;
    </>
  );
}
