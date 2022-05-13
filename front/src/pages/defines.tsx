import DefineDescriptionUrl from '@/components/DefineDescriptionUrl';
import PageCard from '@/components/PageCard';
import { useRequest } from 'ahooks';
import { PageHeader, Table, Drawer } from 'antd';
import React, { useState } from 'react';
import { defines } from '../services/service';

export default function DefinesPage() {
  const { data, error, loading } = useRequest(defines);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<string|undefined>(undefined);
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
    },
    {
      title: 'Detail',
      dataIndex: 'url',
      key:'detail',
      render: (url:string) => (
        <a
          onClick={() => {
            console.log(url);
            showDrawer(url);
          }}
        >
          Detail..
        </a>
      ),
    },
  ];

  const showDrawer = (url:string) => {
    setSelected(url);
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
    setSelected(undefined);
  };
  return (
    <>
      <PageHeader title="订阅定文" subTitle="显示你已订阅的思之文档" />
      <Drawer
        title="定文详细信息"
        placement="bottom"
        onClose={onClose}
        visible={visible}
        size="large"
        destroyOnClose={true}
      >
        <DefineDescriptionUrl url={selected} />
      </Drawer>
      <PageCard>
        <Table rowKey={'url'} columns={columns} dataSource={data} />
      </PageCard>
    </>
  );
}
