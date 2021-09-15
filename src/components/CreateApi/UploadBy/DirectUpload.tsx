/** @jsxImportSource theme-ui **/

import NavButtons from "../NavButtons";
import { Wrapper } from "../Wrapper";

import Dropzone from "react-dropzone";

export const DirectUpload = () => {
  return (
    <Wrapper>
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section
            sx={{
              width: "32.125rem",
              height: "17.5rem",
              border: "1.5px dashed #FFFFFF",
              borderRadius: "1.25rem",
              m: "0 auto",
            }}
          >
            <div
              {...getRootProps()}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input {...getInputProps()} />
              <p>
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
            </div>
          </section>
        )}
      </Dropzone>
      <NavButtons continueEnabled={true} />
    </Wrapper>
  );
};
export default DirectUpload;
