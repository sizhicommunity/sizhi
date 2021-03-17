import { RSSHUB } from "./RssHub";
import { sSProxyOptions, getStringFromUrl } from "../get";

const useLocalRssHub = false;
const remoteRssHubBase = "https://rsshub.app";

export function rsshubGet(
  url: string,
  proxyOptions: string | undefined = undefined
): Promise<string> {
  if (!useLocalRssHub) {
    return getStringFromUrl(
      url.replace(`${RSSHUB}:`, remoteRssHubBase),
      sSProxyOptions
    );
  } else {
    const RSSHub = require("rsshub");

    RSSHub.init({
      // config
    });
    return RSSHub.request(url.substr(RSSHUB.length + 1));
  }
}
