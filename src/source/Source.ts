import { StringKeyObject, Meta } from "../util";
import axios from "axios";
import { getStringFromUrl } from "../get";
import { FeedInfo } from "../define/SizhiDefine";

export interface Source {
  getString(): Promise<string>;
  getFeedInfo(): FeedInfo;
}
export class StringSource implements Source {
  constructor(private string: string, private meta: Meta = {}) {}
  getString(): Promise<string> {
    return Promise.resolve(this.string);
  }
  getFeedInfo(): FeedInfo {
    return { defineUrl: "mock", feedPath: "mock" };
  }
}
export class HttpSource implements Source {
  constructor(private url: string, private feedInfo: FeedInfo) {}
  getString(): Promise<string> {
    return getStringFromUrl(this.url);
  }
  getFeedInfo(): FeedInfo {
    return this.feedInfo;
  }
}
