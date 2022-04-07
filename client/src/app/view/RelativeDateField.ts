import React from "react";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const Field = (prop) => {
  const { record, source } = prop;
  function relative(date: Date): string {
    return dayjs(date).toNow();
  }
  const string = source ? relative(record[source]) : relative(record);
  return React.createElement("div", { children: [string] });
};
export default Field;
