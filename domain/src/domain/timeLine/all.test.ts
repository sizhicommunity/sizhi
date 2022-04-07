import { TimeLine } from ".";
import { Engine } from "./Engine";
import repository from "../define/test/mockRepository";
import { nominalDefine, getSourcesFromDefine } from "../define/SizhiDefine";
import { StringSource } from "../source/Source";

test("all in one", async () => {
  expect.hasAssertions();
  const timeLine = new TimeLine();
  const engine = new Engine(timeLine);
  expect(timeLine).toBeDefined();

  const defines = repository.defines.map(nominalDefine).value();
  const define = defines[0];
  const sources = getSourcesFromDefine(define);

  const mockSource = sources.find((s) => s instanceof StringSource);
  await engine.processSource(mockSource);
  expect(timeLine.getItems()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        url: "https://www.moeunion.com/",
        id: "https://www.moeunion.com/",
      }),
    ])
  );
});
