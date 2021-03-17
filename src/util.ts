export type StringKeyObject<T> = { [key: string]: T };
export type CategorizedObjects<T> = { category: string; objects: Array<T> };
export type Meta = StringKeyObject<any>