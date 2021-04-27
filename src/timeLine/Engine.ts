import { TimeLine } from ".";
import { parseFromString } from "../content/Rss";

import { Source } from "../source/Source";

export class Engine {
  constructor(public timeLine: TimeLine) {}
  async processSource(source: Source): Promise<void> {
    try {
      const info = source.getFeedInfo();
      const string = await source.getString();
      const feed = await parseFromString(string, info);
      this.timeLine.add(
        feed.items.map((item) => ({ ...item, meta: { info } }))
      );
      return;
    } catch (err) {
      console.log(err);
      throw new Error("process source error");
    }
  }
}
