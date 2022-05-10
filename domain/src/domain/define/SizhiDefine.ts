import { StringKeyObject, CategorizedObjects, log } from "../util";
import { Source, HttpSource, StringSource } from "../source/Source";
import * as uri from "uri-js";
import { RSSHUB } from "../rssHub";
import { getStringFromUrl, defaultProxyOptions, sSProxyOptions } from "../get";
import { fromString } from "./FromString";

import * as jsonHash from 'json-hash';

export interface SizhiDefine {
  id: string;
  protocol: string;
  name: string;
  url: string;
  hash: string;
  page: string;
  timestamp: number;
  publish: CategorizedObjects<FeedDefine>[];
  follow?: CategorizedObjects<FeedDefine>[];
  tags?: string[];
  memo?: string;
  annotations?: StringKeyObject<any>;
  valid?: boolean;
}
export interface FeedDefine {
  id: string;
  url: string;
  memo?: string;
  tags?: string[];
  info?: FeedInfo;
}
export function injectFeedInfo(sizhiDefine: SizhiDefine): SizhiDefine {
  return {
    ...sizhiDefine,
    publish: sizhiDefine.publish.map((category) => ({
      ...category,
      objects: category.objects.map((value) =>
        injectFeedInfoForEach(value, {
          defineUrl: sizhiDefine.url,
          feedPath: `publish/${category.category}`,
          url: value.url,
        })
      ),
    })),
    follow: sizhiDefine.follow?.map((category) => ({
      ...category,
      objects: category.objects.map((value) =>
        injectFeedInfoForEach(value, {
          defineUrl: sizhiDefine.url,
          feedPath: `follow/${category.category}`,
          url: value.url,
        })
      ),
    })),
  };
}
export function injectFeedInfoForEach(
  feed: FeedDefine,
  feedInfo: FeedInfo
): FeedDefine {
  return { ...feed, info: feedInfo };
}
export interface DefineInfo {
  url: string;
}
export interface FeedInfo {
  defineUrl: string;
  feedPath: string;
  url: string;
}
export function nominalCategorized(
  origin: StringKeyObject<Array<string>>
): CategorizedObjects<FeedDefine>[] {
  return Object.keys(origin).map((key) => ({
    category: key,
    objects: origin[key].map((urlString) => ({
      id: urlString,
      url: urlString,
    })),
  }));
}
export function nominalDefine(origin: any): SizhiDefine {
  try {
    return {
      ...origin,
      publish: nominalCategorized(origin.publish),
      follow: (origin.follow && nominalCategorized(origin.follow)) ?? [],
    };
  } catch (e) {
    throw new Error("bad define format - " + e.message);
  }
}
export function getSourcesFromDefine(define: SizhiDefine): Source[] {
  return [...define.publish, ...(define.follow ?? [])]
    .map((category) => category.objects.map(feedToSource))
    .flat();
}
export function feedToSource(feed: FeedDefine): Source {
  const url = uri.parse(feed.url);
  if (url.scheme === RSSHUB) return new HttpSource(feed.url, feed.info!!);
  if (url.scheme === "http" || url.scheme === "https")
    return new HttpSource(feed.url, feed.info!!);
  if (url.scheme === "mock")
    return new StringSource(require("../content/mock").default);
}

export async function loadFromUrl(url: string): Promise<SizhiDefine> {
  const defineString = await getStringFromUrl(url, sSProxyOptions);
  log.debug("defineString", defineString);
  const define = fromString(defineString);
  log.debug("define", define);
  define.id = (!define.hash || define.hash === "") ? define.url : define.hash;
  const valid = validate(url, define);
  define.valid = valid;
  return define;
}

export function validate(url: string, define: SizhiDefine) {
  //TODO 加入其他验证，比如hash。目的是防篡改。
  return define.url.trim() === url;
}

export function getFeeds(define: SizhiDefine): FeedDefine[] {
  return [...define.publish, ...(define.follow ?? [])]
    .map((category) => category.objects)
    .flat();
}
export function hash(define: SizhiDefine): string {
  const cloned = {...define};
  delete cloned.hash
  delete cloned.valid
  return jsonHash.digest(cloned);
}
