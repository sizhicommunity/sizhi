import rssXmlString from "./mock";
import { parseFromString } from "./Rss";

test("rss from xml", async () => {
  expect.hasAssertions();
  const feed = await parseFromString(rssXmlString, {
    defineUrl: "mock",
    feedPath: "mock",
    url: 'mock'
  });
  expect(feed).toBeDefined();
  expect(feed.items.length).not.toEqual(0);
  expect(feed.items).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        url: "https://www.moeunion.com/",
        title: expect.anything(),
        body: expect.anything(),
        date: expect.any(Date),
        id: expect.anything(),
        feedInfo: expect.objectContaining({
          defineUrl: "mock",
          feedPath: "mock",
        }),
      }),
    ])
  );
});
