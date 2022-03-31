/** @jsxImportSource theme-ui **/
import React from "react";
import { ThemeUIStyleObject } from "theme-ui";
import Spinner, { SpinnerProps } from "components/common/Spinner";

interface LoaderProps {
  spinnerWrapSx?: ThemeUIStyleObject;
  spinnerProps?: SpinnerProps;
}

export const useLoading = (isLoading: boolean, options?: LoaderProps) => {
  return (children: React.ReactNode) => {
    return isLoading ? (
      <div className="spinner_wrap" sx={options?.spinnerWrapSx}>
        <Spinner {...options?.spinnerProps} />
      </div>
    ) : (
      children
    );
  };
};
