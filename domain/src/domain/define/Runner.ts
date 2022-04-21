import { EventEmitter } from "events";
import { TimeLine } from "../timeLine";
import { Engine } from "../timeLine/Engine";
import { log } from "../util";
import { Repository } from "./Repository";
import { getSourcesFromDefine } from "./SizhiDefine";
export class Runner {
  eventBus = new EventEmitter();
  lifeMinute = 1;
  timeLine = new TimeLine();
  engine = new Engine(this.timeLine);
  rep = undefined;
  feedInfos = [];
  constructor(repository:Repository,timerCount:number=60) {
    this.rep = repository;
    setInterval(
      () => this.eventBus.emit("timer", { date: new Date() }),
      1000
    );
    this.eventBus.on("timer", (event) => {
      log.debug("timer fired", event);
      this.lifeMinute += 1;
      if (this.lifeMinute % timerCount === 0) {
        log.debug("interval fired, update feeds");
        this.rep.log("interval fired", "info");
        const defines = (this.rep.defines.value() ?? []).concat(this.rep.getMyDefine());
        log.debug("defines", defines);
        const sources = defines.map((def) => getSourcesFromDefine(def)).flat();
        this.feedInfos = sources.map((s)=>s.getFeedInfo())
        log.info("feedInfos", this.feedInfos);
        Promise.all(
          sources.map(async (source) => {
            try {
              await this.engine.processSource(source);
            } catch (e) {
              log.debug(e);
              log.warn(
                "error processing source",
                JSON.stringify(source.feedInfo)
              );
              this.rep.log(
                "error processing source - " + JSON.stringify(source.feedInfo),
                "warn"
              );
            }
          })
        );
      }
    });
  }
}
