import { LowWrapper } from "@quick-qui/data-provider";
import { fileAdapter } from "@quick-qui/data-provider/dist/lowdbDP/fileDP";
import { log } from "../util";

import cuid from "cuid";
import { loadFromUrl } from "./SizhiDefine";
//TODO 考虑迁移到nedb，可能当数据太多的时候。
export class Repository {
  low;

  constructor(init: object, source: string) {
    this.low = new LowWrapper(init, fileAdapter(source));
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
  log(message: string, level: string, context: string, details: string) {
    const logs = this.logs.value() ?? [];
    logs.push({
      id: cuid(),
      time: new Date(),
      message,
      level,
      context,
      details,
    });
    this.db.set("logs", logs).write();
  }

  async setMyDefineUrl(url: string) {
    this.low.db.set("myDefineUrl", url).write();
    //TODO, 考虑分开来做。
    await this.syncMyDefine(url);
    this.log("set myDefineUrl - " + url, "info", "myDefine:" + url, "");
  }

  async syncMyDefine(url: string) {
    //TODO 考虑版本、缓存等问题。
    //如果有更新的版本需要刷新内容。
    // const existed = this.low.db.get("myDefine").value();
    // if (!existed) {
    //   if (existed.url === url) {
    //   } else {
    //     //overwrite
    //   }
    // }
    //TODO 其他define同样要刷新。
    let define = await loadFromUrl(url);
    //TODO 考虑url不匹配问题。
    define.url = url;
    this.low.db.set("myDefine", define).write();
  }

  getMyDefine = () => {
    return this.low.db.get("myDefine").value();
  };

  async addDefine(url: string) {
    let defines = this.defines.value();
    let existed = defines.find((d) => d.url === url);
    if (existed) {
      //do nothing if existed.
    } else {
      try {
        let define = await loadFromUrl(url);
        define.url = url;
        defines.push(define);
        this.log("add define - " + url, "info", "define:" + url, "");
        this.db.set("defines", defines).write();
      } catch (err) {
        log.warn("err when add define - " + url);
        this.log(
          "err when add define - " + url,
          "warn",
          "define:" + url,
          err.message
        );
      }
    }
  }
}
