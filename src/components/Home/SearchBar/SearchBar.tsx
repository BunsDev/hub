/** @jsxImportSource theme-ui **/
import SearchIcon from "../../../../public/images/magnifying-glass.svg";
import { Input } from "components";

import styles from "./styles";
import useFindApis from "hooks/useFindApis";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useFindApis("");

  return (
    <Input
      className="search-input"
      type="search"
      value={searchValue}
      placeholder="Search"
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      wrapperSx={styles.wrapper}
      sx={styles.input}
      prefix={
        <SearchIcon alt="searchIcon" draggable={false} sx={styles.searchIcon} />
      }
    />
  );
};

export default SearchBar;
