import ReactJson from "react-json-view";

export default function SimpleJson({ src }:any) {
  return (
    <ReactJson
      src={src}
      name={false}
      collapsed = {1}
      theme="rjv-default"
      enableClipboard={false}
      displayDataTypes={false}
      quotesOnKeys={false}
      style={{
        fontSize: '12px',
        fontFamily:
          'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
      }}
    />
  );
}
