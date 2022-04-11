/** @jsxImportSource theme-ui **/
import styles from "./styles";
import { Flex } from "@theme-ui/components";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Flex sx={styles.wrapper}>{children}</Flex>
);

export default Wrapper;
