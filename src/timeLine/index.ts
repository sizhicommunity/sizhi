import { StringKeyObject } from "../util";
import * as _ from "lodash";
import * as EventEmitter from "events";
export const ITEMS_ADDED = "itemsAdd";
export class TimeLine extends EventEmitter {
  private items: TimeLineItem[] = [];
  constructor() {
    super();
  }
  public add(items: TimeLineItem[]): void {
    if (items.length > 0) {
      this.items = [...this.items, ...items];
      this.emit(ITEMS_ADDED, this);
    }
  }
  public getItems(): TimeLineItem[] {
    return _(this.items).sortBy("date").value();
  }
}
export interface TimeLineItem {
  date: Date;
  title: string;
  id: string;
  meta: StringKeyObject<string>;
}
