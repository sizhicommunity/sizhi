import { sSProxyOptions, getStringFromUrl } from "./get";
import { fromString } from "./define/FromString";
import { getSourcesFromDefine } from "./define/SizhiDefine";
import { TimeLine, ITEMS_ADDED } from "./timeLine";
import { Engine } from "./timeLine/Engine";
import { log } from "./util";
require("dotenv").config();

(async () => {
  try {
    log.debug("start");
    const url =
      "https://gist.githubusercontent.com/nielinjie/824cd2102d5828711ddb55b0146184ac/raw/54ee694eeec3b9e91267205ea9693729f4869516/nielinjie.sizhi";
    const defineString = await getStringFromUrl(url, sSProxyOptions);
    log.debug(defineString);
    const define = fromString(defineString);
    log.debug(define);
    const sources = getSourcesFromDefine(define);
    log.debug(sources);
    const timeLine = new TimeLine();
    timeLine.on(ITEMS_ADDED, () => {
      log.debug(`item add`);
      timeLine.getItems().forEach((item) => log.debug(item.id));
    });
    const engine = new Engine(timeLine);
    sources.forEach((s) => engine.processSource(s));
  } catch (e) {
    log.info(e);
  }
})();
// const ev = require("dotenv").config();
