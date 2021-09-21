/** @jsxImportSource theme-ui **/
import { useState, useCallback } from "react";
import router from "next/router";

import SearchIcon from "../../../../public/images/magnifying-glass.svg";
import { Input } from "components";

import styles from "./styles";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = useCallback((input: string) => {
    if (input) void router.push(`/?search=${input?.trim()}`);
  }, [router]);

  return (
    <Input
      className="search-input"
      type="search"
      value={searchValue}
      placeholder="Search"
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSearch(searchValue);
      }}
      wrapperSx={styles.wrapper}
      sx={styles.input}
      prefix={
        <SearchIcon
          alt="searchIcon"
          draggable={false}
          sx={styles.searchIcon}
          onClick={() => handleSearch(searchValue)}
        />
      }
    />
  );
};

export default SearchBar;
