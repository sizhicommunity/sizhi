import React from "react";
import ReactJson from "react-json-view";
const JsonField = (prop) => {
  const { record, source } = prop;
  return React.createElement(ReactJson, {
    src: record,
    style: {
      fontSize: "0.875rem",
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeight: 400,
    },
    name: false,
    enableClipboard: false,
    onEdit: false,
    onDelete: false,
    onAdd: false,
    iconStyle: "circle",
    collapsed: 5,
    displayObjectSize: false,
    displayDataTypes: false,
    displayArrayKey: false,
    quotesOnKeys: false,
    shouldCollapse: (field) => field.name === "annotations",
  });
};
export default JsonField;
