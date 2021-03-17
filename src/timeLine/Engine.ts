import { TimeLineItem, TimeLine } from ".";
import { parseFromString } from "../content/Rss";

import { Source } from "../source/Source";
import { ContentItem } from "../content";
import { Meta } from "../util";

export class Engine {
  constructor(public timeLine: TimeLine) {}
  async processSource(source: Source): Promise<void> {
    const info = source.getFeedInfo();
    const string = source.getString();
    await string
      .then((s) => parseFromString(s, info))
      .then((feed) =>
        this.timeLine.add(
          feed.items.map((item) => ({ ...item, meta: info as Meta }))
        )
      );
    return;
  }
}
