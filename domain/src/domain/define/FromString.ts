import { SizhiDefine, nominalDefine, injectFeedInfo } from "./SizhiDefine";
import * as yaml from  "js-yaml"
import { assertType } from "typescript-is";
import { log } from "../util";

export function fromString(str:string):SizhiDefine{
    const obj = yaml.load(str) as any
    obj.id=obj.hash
    const normalized = nominalDefine(obj);
    const injected = injectFeedInfo(normalized);
    log.debug("injected",injected)
    return assertType<SizhiDefine>(injected)
}