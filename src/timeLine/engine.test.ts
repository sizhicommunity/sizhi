import { Engine } from "./Engine";
import rssXmlString from "../content/mock";
import { StringSource, HttpSource } from "../source/Source";
import { TimeLine, ITEMS_ADDED } from ".";

test("engine", async () => {
  expect.hasAssertions();
  const timeLine = new TimeLine()
  const engine = new Engine(timeLine);
  expect(timeLine).toBeDefined();
  await engine.processSource(new StringSource(rssXmlString));
  expect(timeLine.getItems()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        url: "https://www.moeunion.com/",
        id: "https://www.moeunion.com/",
      }),
    ])
  );
});


test("engine",  () => {
  expect.hasAssertions();
  const timeLine = new TimeLine();
  const engine = new Engine(timeLine);

  timeLine.on(ITEMS_ADDED,()=>{
    expect(timeLine.getItems()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "https://www.moeunion.com/",
          id: "https://www.moeunion.com/",
        }),
      ])
    );
  })
  expect(timeLine).toBeDefined();
   engine.processSource(new StringSource(rssXmlString));
  
});