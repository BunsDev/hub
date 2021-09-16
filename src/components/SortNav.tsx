/** @jsxImportSource theme-ui **/
import SearchBar from "./SearchBar";

import { Flex } from "theme-ui";

const SortNav = () => {
  return (
    <div>
      <form>
        <Flex
          sx={{
            justifyContent: "space-between",
            flex: 1,
            flexWrap: "wrap",
            alignItems: "center",
            mb: [3, null],
          }}
        >
          <h2 sx={{ fontSize: "28px", mt: [null, "0"] }}>Wrappers</h2>
          <SearchBar />
        </Flex>
      </form>
    </div>
  );
};

export default SortNav;
