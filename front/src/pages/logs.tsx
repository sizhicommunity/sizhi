import { handleDate } from '@/components/date';
import PageCard from '@/components/PageCard';
import { useRequest } from 'ahooks';
import { PageHeader, Table, Card } from 'antd';

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
    render: (time:string)=> {
        return <>{handleDate(Date.parse(time))}</>;
    }
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
      <PageCard>
        <Table columns={columns} dataSource={data} size="small" />
      </PageCard>
    </>
  );
}
