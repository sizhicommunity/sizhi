import { Descriptions, List, Typography } from 'antd';
import _ from 'lodash';
import { handleDate } from './date';
export default function defineDes({ define }:any): JSX.Element {
  if (!define) {
    return <Typography.Text>define is null</Typography.Text>;
  }
  let publishList = _(define?.publish[0].objects[0] ?? []).entries().value();
  let followList = _(define?.follow[0].objects[0] ?? []).entries().value();
  console.log(publishList)
  return (
    <Descriptions title="Define" bordered column={2}>
      <Descriptions.Item label="Name">{define.name}</Descriptions.Item>
      <Descriptions.Item label="Version">{define.version}</Descriptions.Item>
      <Descriptions.Item label="Url" span={2}>
        {define.url}
      </Descriptions.Item>
      <Descriptions.Item label="Time">
        {define.timestamp}({handleDate(define.timestamp)})
      </Descriptions.Item>
      <Descriptions.Item label="Page">{define.page}</Descriptions.Item>

      <Descriptions.Item label="Publish" span={2}>
        <List
          header={<div>Header</div>}
          bordered
          dataSource={publishList}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Descriptions.Item>

      <Descriptions.Item label="Follow" span={2}>
        <List
          header={<div>Header</div>}
          bordered
          dataSource={followList}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Descriptions.Item>
    </Descriptions>
  );
}
