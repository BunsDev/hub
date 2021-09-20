/** @jsxImportSource theme-ui **/
import { Flex } from "@theme-ui/components";

import styles from "./UploadBy/styles";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Flex sx={styles.wrapper}>{children}</Flex>
);

export default Wrapper;
