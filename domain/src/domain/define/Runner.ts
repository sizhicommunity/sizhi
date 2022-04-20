import { EventEmitter } from "events";
import { TimeLine } from "../timeLine";
import { Engine } from "../timeLine/Engine";
import { log } from "../util";
import { getSourcesFromDefine } from "./SizhiDefine";
import { repository } from ".";
export class Runner {
  eventBus = new EventEmitter();
  lifeMinute = 1;
  timeLine = new TimeLine();
  engine = new Engine(this.timeLine);
  rep = repository;
  constructor() {
    setInterval(
      () => this.eventBus.emit("timer", { date: new Date() }),
      60 * 1000
    );
    this.eventBus.on("timer", (event) => {
      log.debug("timer fired", event);
      this.lifeMinute += 1;
      if (this.lifeMinute % 1 === 0) {
        log.debug("interval fired, update feeds");
        this.rep.log("interval fired", "info");
        const defines = this.rep.defines.value() ?? [];
        log.debug("defines", defines);
        const sources = defines.map((def) => getSourcesFromDefine(def)).flat();
        log.debug("sources", sources);
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
