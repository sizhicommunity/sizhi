import {
  forResourceAndFetchType,
  forResourceAndFetchTypeOneParam,
  GetListResult,
  GetOneParams,
  GET_LIST,
  GET_ONE,
  w,
} from "@quick-qui/data-provider";
import { FeedDefine, getFeeds } from "@sizhi/domain";
import { delegateToExistedDp } from "./util";

const _dp = forResourceAndFetchTypeOneParam(
  "feeds",
  GET_LIST,
  async (params) => {
    const defines = await delegateToExistedDp(GET_LIST, "defines", params);
    const feeds = defines.data.map((define) => getFeeds(define)).flat();
    return { data: feeds, total: feeds.length } as GetListResult<FeedDefine>;
  }
);

const _dp2 = forResourceAndFetchTypeOneParam(
  "feeds",
  GET_ONE,
  async (params) => {
    const feeds = await delegateToExistedDp(GET_LIST, "feeds", {});
    return {
      data: feeds.data?.find((feed) => feed.id === (params as GetOneParams).id),
    };
  }
);

export default w(_dp).chain(_dp2).value();
