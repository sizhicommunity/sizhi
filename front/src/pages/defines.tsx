import DefineDescriptionUrl from '@/components/DefineDescriptionUrl';
import PageCard from '@/components/PageCard';
import { useRequest } from 'ahooks';
import { PageHeader, Table } from 'antd';
import React from 'react';
import { defines } from '../services/service';
const columns = [
  {
    title: 'Url',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }
];

export default function DefinesPage() {
  const { data, error, loading } = useRequest(defines);

  return (
    <>
      <PageHeader title="订阅定文" subTitle="显示你已订阅的思之文档" />
      <PageCard>
        <Table rowKey={'url'}
          columns={columns}
          dataSource={data}
          expandable={{
            expandedRowRender: (record) => (
             <DefineDescriptionUrl url ={record.url}/>
            ),
          }}
        />
      </PageCard>
    </>
  );
}
