import { useRequest } from 'ahooks';
import { PageHeader, Row, Form, Input, Button ,Col} from 'antd';
import React, { useCallback, useState } from 'react';
import { defineUrl, myDefine } from '../services/service';
import SimpleJson from '../components/SimpleJson';
export default function myDefinePage() {
  const { data, error, loading } = useRequest(myDefine);
  const [urlValue,setUrlValue] = useState('')
  const {data:urlData,run:urlRun,loading:urlLoading} =useRequest(defineUrl,{manual: true});
  const urlRunCallback = useCallback((e)=>urlRun(urlValue),[urlValue])
  return (
    <PageHeader title="我的定文" subTitle="这里帮助你定义自己的思之定文">
      <Form>
        <Row>
          <Col span={10}>
            <Form.Item label="myDefineUrl">
              <Input.Group compact>
                <Input
                  style={{ width: 'calc(100% - 200px)' }}
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  // defaultValue="https://ant.design"
                />
                <Button type="primary" onClick={urlRunCallback}>
                  Submit
                </Button>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row>
        这里是从url获取的内容 <br />
      </Row>
      <SimpleJson src={data} />
    </PageHeader>
  );
}
