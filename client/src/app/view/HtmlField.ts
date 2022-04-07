import React from "react";
import  ReactHtmlParser  from "react-html-parser";
const Field = (prop) => {
  const { record, source } = prop;
  const html = "<div>" + (source ? record[source] : record) ?? "" + "</div>";
  return React.createElement("div", { children: [ReactHtmlParser(html)] });
};
export default Field;
