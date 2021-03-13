import { mapToPaths } from "./RssHub";

test("build from items", () => {
  const items = [require("./mock")];
  const re = mapToPaths(items);
  expect(re.length).toBe(1);
  expect(re[0]).toEqual(
    expect.objectContaining({
      url: "rsshub:/755/user/:username",
      id: "/755/user/:username",
      params: expect.arrayContaining([
        expect.objectContaining({
          name: "username",
          required: true,
          memo: expect.stringContaining("用户名"),
        }),
      ]),
    })
  );
});
