import {
  forResourceAndFetchTypeOneParam,
  CREATE,
  dpFromDB,
  w,
  CreateParams,
  forResource,
} from "@quick-qui/data-provider";
import assert from "assert";
import { log } from "./util";
import { repository } from "@sizhi/domain";
import { loadFromUrl } from "@sizhi/domain";
const repositoryDp = dpFromDB(repository.db);
const _dp = forResourceAndFetchTypeOneParam(
  "addDefine",
  CREATE,
  async (params) => {
    const { url } = (params as any).data;
    assert(url, "url is required, params - " + JSON.stringify(params));

    const existed = await repository.defines.find({ url }).value();
    if (existed) {
      throw new Error("define from this url existed");
    } else {
      const define = await loadFromUrl(url);
      log.debug("define", define);
      return repositoryDp(CREATE, "defines", {
        data: define,
      } as CreateParams<unknown>);
    }
  }
);
const re = w(_dp).chain(forResource("defines",repositoryDp)).value();
export default re;
