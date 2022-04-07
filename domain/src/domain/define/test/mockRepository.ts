import { Repository } from "../Repository";
let _repository: Repository;

export default _repository || initRepository();

function initRepository() {
  const defines = require("./mock").default;
  _repository = new Repository({defines }, "./mockDefines.db");
  return _repository;
}
