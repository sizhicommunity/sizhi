import React from 'react';
import { Card } from 'antd';

export default function card({ children }: any) {
  return <Card style={{ width: '100%' }}>{children}</Card>;
}
