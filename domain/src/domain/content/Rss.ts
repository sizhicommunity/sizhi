import { ContentItem, ContentFeed } from ".";
import RssParser from "rss-parser";
import dayjs from "dayjs";
import { FeedInfo } from "../define/SizhiDefine";
export interface FeedPath {
  id: string;
  url: string;
  category?: string;
  title: string;
  params: Param[];
}
export interface Param {
  name: string;
  required: boolean;
  memo: string;
}
export interface RssContentItem extends ContentItem {}

export async function parseFromString(str: string,feedInfo:FeedInfo): Promise<RssFeed> {
  const parser = new RssParser();
  const feed = await parser.parseString(str);
  return {
    items: feed.items.map((item) => ({
      url: item.guid ?? item.link,
      date: dayjs(item.pubDate ?? feed.lastBuildDate).toDate(),
      id: item.guid ?? item.id ,
      title: item.title,
      body: item.content,
      feedInfo: feedInfo
    })),
  } as RssFeed;
}

export interface RssFeed extends ContentFeed {
  items: RssContentItem[];
}
/**
 * export interface Output<U> {
    image?: {
      link?: string;
      url: string;
      title?: string;
    },
    paginationLinks?: PaginationLinks;
    link?: string;
    title?: string;
    items: (U & Item)[];
    feedUrl?: string;
    description?: string;
    itunes?: {
      [key: string]: any;
      image?: string;
      owner?: {
        name?: string;
        email?: string;
      };
      author?: string;
      summary?: string;
      explicit?: string;
      categories?: string[];
      keywords?: string[];
    };
  }
  export interface Item {
    link?: string;
    guid?: string;
    title?: string;
    pubDate?: string;
    creator?: string;
    summary?: string;
    content?: string;
    isoDate?: string;
    categories?: string[];
    contentSnippet?: string;
    enclosure?: Enclosure;
  }
  export interface Enclosure {
    url: string;
    length?: number;
    type?: string;
  }
 */
