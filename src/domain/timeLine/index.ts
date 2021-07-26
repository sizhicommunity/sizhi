import { Meta } from "../util";
import  _ from "lodash";
import EventEmitter from "events";
export * from  './Engine'
export const ITEMS_ADDED = "itemsAdd";
export class TimeLine extends EventEmitter {
  private items: TimeLineItem[] = [];
  constructor() {
    super();
  }
  public add(items: TimeLineItem[]): void {
    if (items.length > 0) {
      this.items = _([...this.items, ...items])
        .uniqBy((i) => i.id)
        .sortBy("date")
        .value();
      this.emit(ITEMS_ADDED, this);
    }
  }
  public getItems(): TimeLineItem[] {
    return this.items;
  }
}
export interface TimeLineItem {
  date: Date;
  title: string;
  id: string;
  meta: Meta;
}
