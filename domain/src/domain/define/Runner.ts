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
  timerCounting = 1;
  timeLine = new TimeLine();
  engine = new Engine(this.timeLine);
  rep = undefined;
  shortInterval = 60 * 5; // 5 minutes
  bigInterval = 60 * 25; //25 minutes
  feedInfos: FeedInfo[] = [];
  constructor(repository: Repository) {
    this.rep = repository;
    setInterval(() => this.eventBus.emit("timer", { date: new Date() }), 1000); //every 1 second
    this.eventBus.on("timer", (event) => {
      this.timerCounting += 1;
      if (this.timerCounting % this.shortInterval === 0) {
        this.rep.log("short interval fired", "trace", "timer", "");
        this.eventBus.emit("shortInterval");
      }
      if (this.timerCounting % this.bigInterval === 0) {
        this.rep.log("big interval fired", "trace", "timer", "");
        this.eventBus.emit("bigInterval");
      }
    });
    this.eventBus.on("bigInterval", () => {
      this.findMoreDefine(this.getAllDefines());
    });
    this.eventBus.on("shortInterval", () => {
      this.updateAllSources(this.getAllDefines());
      this.setFeedInfos(this.getAllDefines());
    });
  }

  private getAllDefines(): SizhiDefine[] {
    return _.compact(
      (this.rep.defines.value() ?? []).concat(this.rep.getMyDefine())
    ) as SizhiDefine[];
  }
  private setFeedInfos(defines: SizhiDefine[]) {
    const sources: Source[] = this.getAllSources(defines);

    this.feedInfos = _(sources.map((s) => s.getFeedInfo()))
      .uniqBy("url")
      .value();
  }
  private updateAllSources(defines: SizhiDefine[]) {
    const sources: Source[] = this.getAllSources(defines);

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
            "error processing source",
            "warn",
            "source:" + source.getFeedInfo().url,
            e.message
          );
        }
      })
    );
  }

  private getAllSources(defines: SizhiDefine[]): Source[] {
    return _(defines.map((def) => getSourcesFromDefine(def)).flat())
      .compact()
      .value();
  }

  private findMoreDefine(defines: SizhiDefine[]) {
    let findMoreDefine: DefineInfo[] = _.compact(
      defines.map((def) => getMoreDefineFromDef(def)).flat()
    );
    findMoreDefine.forEach((def) => {
      this.rep.addDefine(def.url);
    });
  }
}
