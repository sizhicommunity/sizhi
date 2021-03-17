
import { FeedPath, Param } from "../content/Rss";
import * as ch from "cheerio";
export const RSSHUB = "rsshub";
export function mapToPaths(items: any[]) {
  return items.map((item) => {
    const $ = ch.load(item.content);
    const pali: string[] = $("li.params")
      .toArray()
      .map((e) => $(e).text());

    return {
      id: item.guid,
      url: `${RSSHUB}:${item.guid}`,
      title: item.title,
      params: parsePara(item.guid, pali),
    } as FeedPath;
  });
}

export function parsePara(path: string, memos: string[]): Param[] {
  const re = /\/\:(\w+)(\??)/g;
  const results = [];
  let arr;
  let memoIndex = 0;
  while ((arr = re.exec(path)) !== null) {
    results.push({ name: arr[1], memo: memos[memoIndex], required: !arr[2] });
    memoIndex = memoIndex + 1;
  }
  return results;
}
export {};
