import { getStringFromUrl, sSProxyOptions } from ".";

test('get without proxy',async ()=>{
    expect.hasAssertions()
    const re = await getStringFromUrl("https://www.baidu.com/");
    expect(re).toBeDefined()
})
test("get  proxy", async () => {
  expect.hasAssertions();
  const re = await getStringFromUrl(
    "https://www.google.com.hk/",
    sSProxyOptions
  );
  expect(re).toEqual(expect.stringContaining('google'))
});
test('get from rss hub',async () => {
  expect.hasAssertions();
  const re = await getStringFromUrl("rsshub:/rsshub/sponsors", sSProxyOptions);
  expect(re).toEqual(expect.stringContaining("https://feeds.pub/"));
});