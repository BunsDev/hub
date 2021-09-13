/** @jsxImportSource theme-ui **/
import solarizedDark from "../theme/Solarized-dark.json";

import { Themed, ThemeUIStyleObject } from "theme-ui";
// eslint-disable-next-line import/order
import Editor, { OnChange, Monaco } from "@monaco-editor/react";

// https://github.com/brijeshb42/monaco-themes/tree/master/themes
import { MouseEventHandler } from "react";

type GQLCodeBlockProps = {
  title?: string;
  readOnly?: boolean;
  height?: string;
  value: string | string[];
  onClick?: MouseEventHandler<HTMLDivElement>;
  handleEditorChange?: OnChange;
  sx?: ThemeUIStyleObject;
};

const GQLCodeBlock = ({
  title,
  readOnly,
  height = "200px",
  value,
  handleEditorChange,
  onClick,
  sx,
}: GQLCodeBlockProps) => {
  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("solarizedDark", solarizedDark);
    monaco.editor.setTheme("solarizedDark");
  };
  return (
    <div
      className="GQLCodeBlock-wrap"
      onClick={onClick}
      sx={{
        ".margin-view-overlays": {
          ">div": {
            ">div": {
              width: "34px !important",
            },
          },
        },
        ...sx,
      }}
    >
      {title ? (
        <Themed.h5
          sx={{
            m: 0,
            py: 2,
            px: ".75rem",
            bg: "#1e1e1e1",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderLeft: "none",
            borderRight: "none",
          }}
        >
          {title}
        </Themed.h5>
      ) : null}
      <Editor
        theme="solarizedDark"
        options={{
          minimap: {
            enabled: false,
          },
          fontFamily: "Nunito sans",
          scrollBeyondLastLine: false,
          readOnly: readOnly,
        }}
        beforeMount={handleEditorWillMount}
        onChange={handleEditorChange}
        height={height}
        defaultLanguage="graphql"
        defaultValue={value.toString()}
      />
    </div>
  );
};

export default GQLCodeBlock;
