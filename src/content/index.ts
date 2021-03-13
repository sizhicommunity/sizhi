
export interface ContentItem{
    id:string
    url:string
    title:string
    body:string
    date:Date
}
export interface ContentFeed{
    items:ContentItem[]
}