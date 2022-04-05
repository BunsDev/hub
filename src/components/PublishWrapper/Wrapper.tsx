/** @jsxImportSource theme-ui **/
import styles from "./styles";

import { Flex } from "@theme-ui/components";
import { useEffect } from "react";
import { clearPublishState } from "utils/storeReset";
import { useStateValue } from "hooks";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [_, dispatch] = useStateValue();
  console.log(_.publish);
  useEffect(() => {
    return () => {
      clearPublishState(dispatch);
    };
  }, []);

  return <Flex sx={styles.wrapper}>{children}</Flex>;
};

export default Wrapper;
