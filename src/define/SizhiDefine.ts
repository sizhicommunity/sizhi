import { StringKeyObject, CategorizedObjects } from "../util";
import { Source, HttpSource } from "../source/Source";

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
// export function getSourcesFromDefine(define: SizhiDefine): Source[] {
//   return define.publish
//     .map((category) =>
//       category.objects.map((feed) => new HttpSource(feed.url, feed.info))
//     )
//     .flat();
// }
