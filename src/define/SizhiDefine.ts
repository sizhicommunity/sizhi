import { StringKeyObject, CategorizedObjects } from "../util";
import { Source, HttpSource, StringSource } from "../source/Source";
import * as uri from "uri-js";
import { RSSHUB } from "../rssHub";

export interface SizhiDefine {
  id: string;
  version: string;
  url: string;
  page: string;
  publish: CategorizedObjects<FeedDefine>[];
  follow?: CategorizedObjects<FeedDefine>[];
  tags?: string[];
  memo?: string;
  annotations?: StringKeyObject<any>;
}
export interface FeedDefine {
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
        })
      ),
    })),
    follow: sizhiDefine.follow?.map((category) => ({
      ...category,
      objects: category.objects.map((value) =>
        injectFeedInfoForEach(value, {
          defineUrl: sizhiDefine.url,
          feedPath: `follow/${category.category}`,
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
}
export function nominalCategorized(
  origin: StringKeyObject<Array<string>>
): CategorizedObjects<FeedDefine>[] {
  return Object.keys(origin).map((key) => ({
    category: key,
    objects: origin[key].map((urlString) => ({ url: urlString })),
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

