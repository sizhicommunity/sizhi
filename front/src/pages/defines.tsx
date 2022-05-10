import { useRequest } from 'ahooks';
import { PageHeader, Table } from 'antd';
import { defines } from '../services/service';
const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  
];

export default function DefinesPage() {
  const { data, error, loading } = useRequest(defines);

  return (
    <>
      <PageHeader title="订阅定文" subTitle="显示你已订阅的思之文档" />
      <Table columns={columns} dataSource={data} />;
    </>
  );
}
