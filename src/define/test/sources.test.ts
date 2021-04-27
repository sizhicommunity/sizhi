import repository from "../Repository";
import { nominalDefine, getSourcesFromDefine } from "../SizhiDefine";
import { StringSource, HttpSource } from "../../source/Source";

test("source from define", () => {
  expect(repository).toBeDefined();
  const defines = repository.defines.map(nominalDefine);
  const define = defines[0];
  const sources = getSourcesFromDefine(define);
  expect(sources).toEqual(
    expect.arrayContaining([expect.any(StringSource), expect.any(HttpSource)])
  );
});
