import { hash } from "../SizhiDefine";

test("hash of define", () => {
  const defines = require("./mock").default;
  expect(hash(defines[0])).toBeDefined();
  const other = require("./mock").default;
  expect(hash(defines[0])).toEqual(hash(other[0]));
});
test("hash of diff defines", () => {
  const defines = require("./mock").default;
  const define = defines[0];
  const other = { ...define };
  expect(hash(other)).toEqual(hash(define));
  const other2 = { ...define, timestamp: new Date().getTime() };
  expect(hash(other2)).not.toEqual(hash(define));
  const other3 = { ...define, valid: false };
  expect(hash(other3)).toEqual(hash(define));
});
