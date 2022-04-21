import { LowWrapper } from "@quick-qui/data-provider";
import { fileAdapter } from "@quick-qui/data-provider/dist/lowdbDP/fileDP";

import cuid from "cuid";
import { loadFromUrl, SizhiDefine } from "./SizhiDefine";

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
  log(message: string, level: string) {
    const logs = this.logs.value() ?? [];
    logs.push({
      id: cuid(),
      time: new Date(),
      message,
      level,
    });
    this.db.set("logs", logs).write();
  }

  async setMyDefineUrl(url: string) {
    this.low.db.set("myDefineUrl", url).write();
    this.log("set myDefineUrl - " + url, "info");
    //TODO, 考虑分开来做。
    await this.syncMyDefine(url);
  }

  async syncMyDefine(url: string) {
    //TODO 考虑版本、缓存等问题。
    // const existed = this.low.db.get("myDefine").value();
    // if (!existed) {
    //   if (existed.url === url) {
    //   } else {
    //     //overwrite
    //   }
    // }
    let define = await loadFromUrl(url);
    //TODO 考虑url不匹配问题。
    define.url = url;
    this.low.db.set("myDefine", define).write();
  }

  getMyDefine = () => {
    return this.low.db.get("myDefine").value();
  };
}
