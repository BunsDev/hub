/** @jsxImportSource theme-ui **/
import SearchBar from "./SearchBar";

import { Flex } from "theme-ui";

const SortNav = () => {
  return (
    <nav>
      <form>
        <Flex
          sx={{
            justifyContent: "space-between",
            flex: 1,
            alignItems: "center",
          }}
        >
          <h2 sx={{ fontSize: "28px" }}>Wrappers</h2>
          <SearchBar />
        </Flex>
      </form>
    </nav>
  );
};

export default SortNav;
