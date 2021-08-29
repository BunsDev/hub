/** @jsxImportSource theme-ui **/
import { Flex, Select } from "theme-ui";

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
          <div>
            <Select
              sx={{
                minWidth: "8rem",
                border: "none",
                borderRadius: "20px",
                backgroundColor: "w3Grey1",
                p: ".5rem 1rem",
                optgroup: {
                  padding: 6,
                },
              }}
            >
              <optgroup label="Sort by">
                <option value="MostRecent">Most Recent</option>
                <option value="Alphabetical">Alphabetical</option>
                <option value="HighestRated">Higest Rated</option>
              </optgroup>
              <optgroup label="Filter by">
                <option value="OnlyPublished">Only Published</option>
              </optgroup>
            </Select>
          </div>
        </Flex>
      </form>
    </nav>
  );
};

export default SortNav;
