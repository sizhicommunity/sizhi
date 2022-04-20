import { Repository } from "./Repository";

export * from "./FromString";
export * from "./Repository";
export * from "./SizhiDefine";
let _repository: Repository;


export const repository: Repository = _repository || initRepository();

function initRepository() {
  // const defines = require("./test/mock").default;
  _repository = new Repository({ defines: [], logs: [] }, "./defines.db");
  // _repository = new Repository({}, "./mockDefines.db");
  return _repository;
}
