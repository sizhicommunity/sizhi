import { LowWrapper } from "@quick-qui/data-provider";
import { fileAdapter } from "@quick-qui/data-provider/dist/lowdbDP/fileDP";
import { EventEmitter } from "events";
import { TimeLine } from "../timeLine";
import { Engine } from "../timeLine/Engine";
import { log } from "../util";
import { getSourcesFromDefine } from "./SizhiDefine";
import cuid from 'cuid'
let _repository: Repository;

export class Repository {
  low;
  eventBus = new EventEmitter();
  lifeMinute = 1;
  timeLine = new TimeLine();
  engine = new Engine(this.timeLine);
  constructor(init: object, source: string) {
    this.low = new LowWrapper(init, fileAdapter(source));
    setInterval(
      () => this.eventBus.emit("timer", { date: new Date() }),
      60 * 1000
    );
    this.eventBus.on("timer", (event) => {
      log.debug("timer fired", event);
      this.lifeMinute += 1;
      if (this.lifeMinute % 1 === 0) {
        log.debug("interval fired, update feeds");
        this.log("interval fired", "info");
        const defines = this.defines.value() ?? [];
        log.debug("defines", defines);
        const sources = defines.map((def) => getSourcesFromDefine(def)).flat();
        log.debug("sources", sources);
        Promise.all(
          sources.map(async (source) => {
            try {
              await this.engine.processSource(source);
            } catch (e) {
              log.debug(e)
              log.warn(
                "error processing source",
                JSON.stringify(source.feedInfo)
              );
              this.log(
                "error processing source - " + JSON.stringify(source.feedInfo),
                "warn"
              );
            }
          })
        );
      }
    });
  }
  get defines() {
    return this.low.db.get("defines");
  }
  get db() {
    return this.low.db;
  }

  get logs() {
    return this.low.db.get("logs");
  }
  log(message: string, level: string) {
    const logs = this.logs.value() ?? [];
    logs.push({
      id:cuid(),
      time: new Date(),
      message,
      level,
    });
    this.db.set("logs", logs).write();
  }
  
}

export default _repository || initRepository();

function initRepository() {
  // const defines = require("./test/mock").default;
  _repository = new Repository({ defines: [], logs: [] }, "./defines.db");
  // _repository = new Repository({}, "./mockDefines.db");
  return _repository;
}
