/** @jsxImportSource theme-ui **/
import { Flex } from "theme-ui";

import { SearchBar } from "components";

import styles from './styles'

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
