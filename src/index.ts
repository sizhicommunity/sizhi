import { getStringFromUrl, sSProxyOptions } from "@sizhi/domain";

const string =  getStringFromUrl(
  "https://rsshub.app/github/trending/daily/javascript",sSProxyOptions
).then(s=>console.log(s));
console.log(string)

const string2 = getStringFromUrl(
  "https://rsshub.app/rsshub/sponsors",
  sSProxyOptions
).then((s) => console.log(s));
console.log(string2);