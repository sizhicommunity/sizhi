import {
  dpFromDB,
  forResourceAndFetchType,
  forResourceAndFetchTypeOneParam,
  GET_LIST,
} from "@quick-qui/data-provider";
import {repository} from "@sizhi/domain";
const repositoryDp = dpFromDB(repository.db);

const _dp = forResourceAndFetchType("logs", GET_LIST, repositoryDp);

export default _dp;
