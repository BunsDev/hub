/** @jsxImportSource theme-ui **/
import solarizedDark from "../../theme/Solarized-dark.json";
import styles from "./styles";

import { MouseEventHandler } from "react";
import { Themed, ThemeUIStyleObject } from "theme-ui";
// eslint-disable-next-line import/order
import Editor, { OnChange, Monaco } from "@monaco-editor/react";
// https://github.com/brijeshb42/monaco-themes/tree/master/themes

type GQLCodeBlockProps = {
  title?: string;
  readOnly?: boolean;
  height?: string;
  value: string | string[];
  onClick?: MouseEventHandler<HTMLDivElement>;
  handleEditorChange?: OnChange;
  sx?: ThemeUIStyleObject;
  classNames?: string;
};

const GQLCodeBlock = ({
  title,
  readOnly,
  height = "200px",
  value,
  handleEditorChange,
  onClick,
  sx,
  classNames,
}: GQLCodeBlockProps) => {
  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("solarizedDark", solarizedDark);
    monaco.editor.setTheme("solarizedDark");
  };
  return (
    <div
      className={`GQLCodeBlock-wrap ${classNames}`}
      onClick={onClick}
      sx={{ ...styles.gqlcodeblock, ...sx }}
    >
      {title ? <Themed.h5 className="title">{title}</Themed.h5> : null}
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
