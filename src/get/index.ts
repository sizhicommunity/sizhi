import axios from "axios";
import { SocksProxyAgent } from "socks-proxy-agent";
import { RSSHUB } from "../rssHub/RssHub";
import { rsshubGet } from "../rssHub";
export const sSProxyOptions = `socks5://127.0.0.1:1086`;

export async function getStringFromUrl(
  url: string,
  proxyOptions: string | undefined = undefined
): Promise<string> {
  if(url.startsWith(`${RSSHUB}:`)){
    return rsshubGet(url,proxyOptions)
  }
  let httpsAgent = undefined;
  let httpAgent = undefined;
  if (proxyOptions && proxyOptions.startsWith("socks5:")) {
    httpsAgent = new SocksProxyAgent(proxyOptions);
    httpAgent = new SocksProxyAgent(proxyOptions);
  }
  const body = (
    await axios.get(
      url,
      filterObject({
        httpsAgent,
        httpAgent,
      })
    )
  ).data;
  return body;
}
export function filterObject(obj: any) {
  const ret: any = {};
  Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .forEach((key) => (ret[key] = obj[key]));
  return ret;
}
