/** @jsxImportSource theme-ui **/
import solarizedDark from "../theme/Solarized-dark.json";

// eslint-disable-next-line import/order
import Editor, { Monaco, OnChange } from "@monaco-editor/react";

// https://github.com/brijeshb42/monaco-themes/tree/master/themes
import { MouseEventHandler } from "react";

type GQLCodeBlockProps = {
  height?: string;
  value: Record<string, unknown>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  handleEditorChange?: OnChange;
};

const JSONEditor = ({
  height = "100%",
  value,
  handleEditorChange,
  onClick,
}: GQLCodeBlockProps) => {
  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("solarizedDark", solarizedDark);
    monaco.editor.setTheme("solarizedDark");
  };

  return (
    <div className="GQLCodeBlock-wrap" onClick={onClick} sx={{ height }}>
      <Editor
        theme="solarizedDark"
        beforeMount={handleEditorWillMount}
        onChange={handleEditorChange}
        defaultLanguage="json"
        value={JSON.stringify(value, null, 2)}
        options={{
          minimap: {
            enabled: false,
          },
          fontFamily: "Nunito sans",
          lineNumbers: "off",
        }}
      />
    </div>
  );
};

export default JSONEditor;
