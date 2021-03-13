let _repository = undefined;

export default _repository || initRepository();

function initRepository() {
  // const path =
  const defines = require("./mock").default;
  _repository = {
    defines,
  };
  return _repository;
}
