import {
  dpFromDB,
  forResourceAndFetchType,
  forResourceAndFetchTypeOneParam,
  GET_LIST,
  GET_ONE,
  withDynamicData,
} from "@quick-qui/data-provider";
import {repository} from "@sizhi/domain";

const _dp = forResourceAndFetchType(
  "contentItems",
  [GET_LIST, GET_ONE],
  withDynamicData(() => ({
    contentItems: repository.timeLine.getItems(),
  })).value()
);

export default _dp;
