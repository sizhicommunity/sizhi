import { define } from "@/services/service"
import { useRequest } from "ahooks"
import DefineDescription from "./DefineDescription"

export default function defineFromUrl({url}:any){
    let { data, loading, error } = useRequest(define, { defaultParams :[url]});
    return <DefineDescription define = {data}/>
}