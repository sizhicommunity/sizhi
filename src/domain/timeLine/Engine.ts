import { lodashGetEvaluator } from "@quick-qui/util";
import { TimeLine } from ".";
import { parseFromString } from "../content/Rss";

import { Source } from "../source/Source";
import { log } from "../util";

export class Engine {
  constructor(public timeLine: TimeLine) {}
  async processSource(source: Source): Promise<void> {
    try {
      const info = source.getFeedInfo();
      const string = await source.getString();
      log.debug('got string',string)
      const feed = await parseFromString(string, info);
      log.debug('feed',feed)
      this.timeLine.add(
        feed.items.map((item) => ({ ...item, meta: { info } }))
      );
      return;
    } catch (err) {
      log.debug(err);
      throw new Error("process source error");
    }
  }
}
