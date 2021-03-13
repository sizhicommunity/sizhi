import { parsePara } from "./RssHub"

test("parse paras",()=>{
    const re = parsePara('/755/timeline/:user',['user'])
    expect(re.length).toBe(1)
    expect(re[0].name).toBe('user')
})
test("parse paras", () => {
  const re = parsePara("/755/timeline/:user/:type", ["user"]);
  expect(re.length).toBe(2);
  expect(re[0].name).toBe("user");
  expect(re[1].name).toBe("type");
});
test("parse paras", () => {
  const re = parsePara("/755/timeline/:user/:type", ["user","type"]);
  expect(re.length).toBe(2);
  expect(re[0].name).toBe("user");
  expect(re[0].memo).toBe("user");
  expect(re[1].name).toBe("type");
  expect(re[1].memo).toBe("type");
  expect(re[1].required).toBe(true);
});

test("parse paras", () => {
  const re = parsePara("/755/timeline/:user/:type?", ["user", "type"]);
  expect(re.length).toBe(2);
  expect(re[0].name).toBe("user");
  expect(re[0].memo).toBe("user");
  expect(re[1].name).toBe("type");
  expect(re[1].memo).toBe("type");
  expect(re[1].required).toBe(false);
  
  

});

