import { SizhiDefine, nominalDefine, injectFeedInfo } from "./SizhiDefine";
import * as yaml from  "js-yaml"
import { assertType } from "typescript-is";

export function fromString(str:string):SizhiDefine{
    const obj = yaml.load(str)
    const normalized = nominalDefine(obj);
    const injected = injectFeedInfo(normalized);
    return assertType<SizhiDefine>(injected)
}