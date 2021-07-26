import { getStringFromUrl, sSProxyOptions } from ".";
jest.setTimeout(30 * 1000);
describe("net work ", () => {
  test("get without proxy", async () => {
    expect.hasAssertions();
    const re = await getStringFromUrl("https://www.baidu.com/", undefined);
    expect(re).toBeDefined();
  });
  test("get proxy", async () => {
    expect.hasAssertions();
    const re = await getStringFromUrl(
      "https://www.google.com.hk/",
      sSProxyOptions
    );
    expect(re).toEqual(expect.stringContaining("google"));
  });
  test("get from rss hub", async () => {
    expect.hasAssertions();
    const re = await getStringFromUrl(
      "https://rsshub.app/github/trending/daily/javascript",
      sSProxyOptions
    );
    expect(re).toEqual(
      expect.stringContaining("Trending JavaScript repositories on GitHub")
    );
  });
  test("get from rss hub", async () => {
    expect.hasAssertions();
    const re = await getStringFromUrl(
      "rsshub:/rsshub/sponsors",
      sSProxyOptions
    );
    expect(re).toEqual(expect.stringContaining("https://feeds.pub/"));
  });
});
