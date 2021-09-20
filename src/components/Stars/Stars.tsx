/** @jsxImportSource theme-ui **/
import { Flex } from "theme-ui";

import styles from "./styles";

type BadgeProps = {
  count: number;
  onDark?: boolean;
  large?: boolean;
  onClick?: () => void;
};

const Stars = ({ count, onDark, large, onClick }: BadgeProps) => {
  return (
    <Flex
      onClick={onClick}
      className={"stars" + large ? "large" : ""}
      sx={styles.wrap}
    >
      <img className="star" src="/images/star.svg" />
      <div className="star-count">{count}</div>
    </Flex>
  );
};

export default Stars;
