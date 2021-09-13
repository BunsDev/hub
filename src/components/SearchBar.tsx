/** @jsxImportSource theme-ui **/
import { useState, useCallback } from "react";
import SearchIcon from "../../public/images/magnifying-glass.svg";
import router from "next/router";
import Input from "./Input";
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = useCallback((input: string) => {
    if (input) void router.push(`/?search=${input?.trim()}`);
  }, []);

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
      wrapperSx={{
        alignItems: "center",
        p: "0.625rem 0.75rem",
        background: "rgba(0, 0, 0, 0.24)",
        borderRadius: "1.25rem",
        width: ["17.5rem", "100%"],
      }}
      sx={{
        border: "none",
        p: 0,
        height: "1rem",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "100%",
        fontFamily: "Nunito sans",
        background: "transparent",
      }}
      prefix={
        <SearchIcon
          alt="searchIcon"
          draggable={false}
          sx={{
            cursor: "pointer",
            userSelect: "none",
            mr: ".5rem",
          }}
          onClick={() => handleSearch(searchValue)}
        />
      }
    />
  );
};

export default SearchBar;
