import { Descriptions, List, Typography } from 'antd';
import _ from 'lodash';
import { handleDate } from './date';



export default function defineDes({ define }: any): JSX.Element {
  if (!define) {
    return <Typography.Text>define is null</Typography.Text>;
  }
  let publishList = define?.publish ?? [];
  let followList = define?.follow ?? [];
  return (
    <Descriptions title="Define" bordered column={2}>
      <Descriptions.Item label="Name">{define.name}</Descriptions.Item>
      <Descriptions.Item label="Version">{define.version}</Descriptions.Item>
      <Descriptions.Item label="Url" span={2}>
        {define.url}
      </Descriptions.Item>
      <Descriptions.Item label="Time">
        {new Date(define.timestamp).toISOString()}({handleDate(define.timestamp)})
      </Descriptions.Item>
      <Descriptions.Item label="Page">{define.page}</Descriptions.Item>

      <Descriptions.Item label="Publish" span={2}>
        {publishList.map((item: any) => {
          return (
            <List
              size="small"
              header={
                <Typography.Title level={5}>{item.category}</Typography.Title>
              }
              dataSource={item.objects}
              renderItem={(i: any) => <List.Item>{i.url}</List.Item>}
              rowKey="url"
            />
          );
        })}
      </Descriptions.Item>

      <Descriptions.Item label="Follow" span={2}>
        {followList.map((item: any) => {
          return (
            <List
              size="small"
              header={<Typography.Title level={5}>{item.category}</Typography.Title>}
              dataSource={item.objects}
              renderItem={(i:any) => <List.Item>{i.url}</List.Item>}
              rowKey = 'url'
            />
          );
        })}
      </Descriptions.Item>
    </Descriptions>
  );
}
