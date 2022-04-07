import { FeedInfo } from "../define/SizhiDefine";

export interface ContentItem {
    id:string
    url:string
    title:string
    body:string
    date:Date
    feedInfo: FeedInfo
}
export interface ContentFeed{
    items:ContentItem[]
}