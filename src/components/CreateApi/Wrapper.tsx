/** @jsxImportSource theme-ui **/

import { Flex } from "@theme-ui/components";

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Flex
    sx={{
      flexDirection: "column",
      mt: ["3.125rem", "0"],
      height: "100%",
      ".fieldset": {
        margin: [null, "auto 0"],
      },
      ".inputwrap": {
        maxWidth: "100%",
        width: ["30.6875rem", null],
      },
    }}
  >
    {children}
  </Flex>
);
