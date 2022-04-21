import axios from "axios";
const https = require("https");

import { SocksProxyAgent } from "socks-proxy-agent";
import { RSSHUB, rsshubGet } from "../rssHub";
import { log } from "../util";
import * as tunnel from "tunnel";

export const sSProxyOptions = 'yes'//`socks5://127.0.0.1:1086`;
export let defaultProxyOptions = {
  proxy: {
    host: "127.0.0.1",
    port: 8118,
  },
};
export async function getStringFromUrl(
  url: string,
  proxyOptions: string | undefined
): Promise<string> {
  if (url.startsWith(`${RSSHUB}:`)) {
    log.info('in rsshub')
    return rsshubGet(url, proxyOptions);
  }
  if(url.startsWith('mock:')){
    let re = require(url.substring(5))
    return re?.default
  }
  try {
    if (proxyOptions) {
      log.info(proxyOptions);
      log.info(url);
      const agent = tunnel.httpsOverHttp(defaultProxyOptions);
      return (await axios.get(url, {
        httpsAgent: agent,
        proxy: false,
      })).data;
    } else {
      return (await axios.get(url)).data;
    }
  } catch (e) {
    log.debug(e);
    throw new Error("get url error - " + url);
  }
}
export function filterObject(obj: any) {
  const ret: any = {};
  Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .forEach((key) => (ret[key] = obj[key]));
  return ret;
}
