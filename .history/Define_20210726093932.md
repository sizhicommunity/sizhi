# 思之定义文档

## 典型实例

一个典型的”思之定义“文档如下所示。

```yaml
name: nielinjie # name, 作为一个标称，思之机制并不要求其为唯一的，思之中唯一的东西是url
protocol: "sizhi:0.1.0" # 思之协议的标志，固定写法
url: "https://gist.github.com/nielinjie/824cd2102d5828711ddb55b0146184ac/raw" # 发布此定义文档的url。需要一个可控不变的url。
page: www.nietongxue.xyz # 一个可选的主页。其他用户可以参看，没有其他约定。
hash: 5cbd20bb-c85c-5fc2-a856-3a294891df88 # 一个hash结果，用于保证文档的完整性。参见项目相关文档。
timestamp: 1626686918672 # 文档修改时间。‘milliseconds since Jan 1, 1970, 00:00:00.000 GMT’
publish: # 用户发布的部分。
  work: # 内容分类，可选。
    - rsshub:/zhihu/posts/people/nielinjie # 发布内容。支持多种协议。参见项目相关文档。
  mock: # 同上，此处为开发用的mock，一般用户没有意义。
    - mock://xxx
follow: # 用户follow的部分。
  work: # 内容分类，可选。
    - rsshub:/github/trending/daily/javascript # 发布内容。支持多种协议。参见项目相关文档。
    - https://www.v2ex.com/feed/tab/creative.xml
    - sizhi://example.com/foo
```

要点有：

1. 与url绑定，务必选择一个可控、不变的url发布此文档。如果url变化，思之身份将变化。
2. hash帮助思之保证定义文档的完整性，具体机制待设计。目前算法见下。
3. 定义文档可以被以各种方式传播，但思之机制将回到url验证其正确性及是否有更新。
4. 内容协议有多种，只要相关的客户端支持。目前都以rss扩展而来，比如。
   - `rsshub` - rsshub地址。
   - `sizhi` - 思之定义文档地址。
   - `https` `http` -  一般的rss/atom内容
   - `opml` - 以OPML形式存在的rss/atom



## hash算法

```typescript
import yaml from 'js-yaml';
import { v5 as uuidv5 } from "uuid";
import stringify from "json-stable-stringify";

const obj = yaml.load(contentString) as any
obj.hash=''
const hashString = stringify(obj)
const namespace = uuidv5("https://github.com/sizhicommunity/sizhi", uuidv5.URL);
const hash = uuidv5(hashString,namespace);
```


