/** @jsxImportSource theme-ui **/

import { Flex } from "@theme-ui/components";
import styles from "./UploadBy/styles";

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Flex
    sx={styles.wrapper}
  >
    {children}
  </Flex>
);
