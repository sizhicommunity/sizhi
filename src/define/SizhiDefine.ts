export interface SizhiDefine {
  id: string;
  url: string;
  userName: string;
  publish: FeedDefine[];
  following?: FeedDefine[];
  tags?: string[];
  memo?: string;
  annotations?: StringKeyObject;
}
export interface FeedDefine {
  id: string;
  url: string;
  memo: string;
  tags?: string[];
}
export type StringKeyObject = { [key: string]: any };
export function parse(yaml:string){
         
}