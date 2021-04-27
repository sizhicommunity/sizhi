import { getStringFromUrl } from "../get";
import { FeedInfo } from "../define/SizhiDefine";

export interface Source {
  getString(): Promise<string>;
  getFeedInfo(): FeedInfo;
}
export class StringSource implements Source {
  constructor(private string: string) {}
  getString(): Promise<string> {
    return Promise.resolve(this.string);
  }
  getFeedInfo(): FeedInfo {
    return { defineUrl: "mockString", feedPath: "mockString" };
  }
}
export class HttpSource implements Source {
  constructor(private url: string, private feedInfo: FeedInfo) {}
  getString(): Promise<string> {
    try{
    return getStringFromUrl(this.url);
    }catch(e){
      console.log(e)
      throw new Error('url error - '+this.url + e.message);
    }
  }
  getFeedInfo(): FeedInfo {
    return this.feedInfo;
  }
}
