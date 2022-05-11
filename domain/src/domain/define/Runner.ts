import { EventEmitter } from "events";
import _ from "lodash";
import { Source } from "../source/Source";
import { TimeLine } from "../timeLine";
import { Engine } from "../timeLine/Engine";
import { log } from "../util";
import { Repository } from "./Repository";
import {
  DefineInfo,
  FeedInfo,
  getMoreDefineFromDef,
  getSourcesFromDefine,
  SizhiDefine,
} from "./SizhiDefine";
export class Runner {
  eventBus = new EventEmitter();
  lifeMinute = 1;
  timeLine = new TimeLine();
  engine = new Engine(this.timeLine);
  rep = undefined;
  feedInfos: FeedInfo[] = [];
  constructor(repository: Repository, timerCount: number = 60) {
    this.rep = repository;
    setInterval(() => this.eventBus.emit("timer", { date: new Date() }), 1000);
    this.eventBus.on("timer", (event) => {
      log.debug("timer fired", event);
      this.lifeMinute += 1;
      if (this.lifeMinute % timerCount === 0) {
        log.debug("interval fired, update feeds");
        this.rep.log("interval fired", "debug");
        const defines: SizhiDefine[] = _.compact(
          (this.rep.defines.value() ?? []).concat(this.rep.getMyDefine())
        ) as SizhiDefine[];
        log.debug("defines", defines);
        const sources: Source[] = _(
          defines.map((def) => getSourcesFromDefine(def)).flat()
        ).compact().value();

        let findMoreDefine: DefineInfo[] = _.compact(
          defines.map((def) => getMoreDefineFromDef(def)).flat()
        );
        findMoreDefine.forEach((def) => {
          this.rep.addDefine(def.url);
        });

        this.feedInfos = _(sources.map((s) => s.getFeedInfo())).uniqBy('url').value();
        Promise.all(
          sources.map(async (source) => {
            try {
              await this.engine.processSource(source);
            } catch (e) {
              log.debug(e);
              log.warn(
                "error processing source",
                JSON.stringify(source.getFeedInfo())
              );
              this.rep.log(
                "error processing source - " +
                  JSON.stringify(source.getFeedInfo()),
                "warn"
              );
            }
          })
        );
      }
    });
  }
}
