export type StringKeyObject<T> = { [key: string]: T };
export type CategorizedObjects<T> = { category: string; objects: Array<T> };
export type Meta = StringKeyObject<any>;
import { logging } from "@quick-qui/util";

export const log = logging("sizhi:model");
