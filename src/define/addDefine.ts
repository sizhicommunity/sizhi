import {
  forResourceAndFetchTypeOneParam,
  CREATE,
  DataProvider,
} from "@quick-qui/data-provider";
import { implementationGlobal } from "@quick-qui/model-defines";
import { assert } from "console";
import { exit } from "process";

const _dp = forResourceAndFetchTypeOneParam(
  "AddDefineRequest",
  CREATE,
  async (params) => {
    const { url } = params as any;
    assert(url, "url is required");
    const existingDp: DataProvider = implementationGlobal?.["dataProvider"]!;
    
    return existingDp(CREATE,'Defines',{data:{}})
  }
);
