/** @jsxImportSource theme-ui **/
import styles from "./styles";

import { Flex } from "theme-ui";
import { SearchBar } from "components";

const SortNav = () => {
  return (
    <div>
      <form>
        <Flex sx={styles.wrap}>
          <h2>Wrappers</h2>
          <SearchBar />
        </Flex>
      </form>
    </div>
  );
};

export default SortNav;
