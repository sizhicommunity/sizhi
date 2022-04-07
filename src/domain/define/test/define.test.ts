import { nominalDefine, SizhiDefine } from "../SizhiDefine";
import { assertType } from "typescript-is";
import { fromString } from "../FromString";

test("load define", () => {
  const defines = require("./mock").default;
  expect(defines.length).toEqual(1);
  const define = nominalDefine(defines[0]);
  const validated = assertType<SizhiDefine>(define);
  expect(validated).toEqual(
    expect.objectContaining({
      name: "nielinjie",
      publish: expect.arrayContaining([
        expect.objectContaining({
          category: "mock",
        }),
      ]),
    })
  );
});
test("load define with version error", () => {
  const defines = require("./mock2").default;
  expect(defines.length).toEqual(1);
  const define = nominalDefine(defines[0]);
  expect(define).toBeDefined();
  expect(() => assertType<SizhiDefine>(define)).toThrowError(/.*version.*/);
});
test("load define with work error", () => {
  const defines = require("./mock3").default;
  expect(defines.length).toEqual(1);
  expect(() => nominalDefine(defines[0])).toThrowError(/^bad\ define/);
});

test("bad define", () => {
  const defines = require("./badDefine").default;
  expect(defines.length).toEqual(1);
  expect(() => nominalDefine(defines[0])).toThrowError(/^bad\ define/);
});

test('load from string',()=>{
  const string= require('./mockString').default
  const define= fromString(string)
  const validated = assertType<SizhiDefine>(define);
  expect(validated).toEqual(
    expect.objectContaining({
      name: "nielinjie",
      publish: expect.arrayContaining([
        expect.objectContaining({
          category: "mock",
        }),
      ]),
    })
  );
})