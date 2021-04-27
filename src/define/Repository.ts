let _repository = undefined;

export default _repository || initRepository();

function initRepository() {
  // const path =
  const defines = require("./test/mock").default;
  _repository = {
    defines,
  };
  return _repository;
}
