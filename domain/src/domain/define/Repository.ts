import { LowWrapper } from "@quick-qui/data-provider";
import { fileAdapter } from "@quick-qui/data-provider/dist/lowdbDP/fileDP";

import cuid from "cuid";

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
}

