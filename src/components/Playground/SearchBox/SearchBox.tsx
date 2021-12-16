/** @jsxImportSource theme-ui **/
import { useState, useEffect, useCallback } from "react";
import { ThemeUIStyleObject } from "theme-ui";
import RDS, { SelectRenderer } from "react-dropdown-select";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import stripIPFSPrefix from "utils/stripIPFSPrefix";
import { ipfsGateway } from "../../../constants";

import styles from "./styles";
import { Input } from "components";

type RDSProps = {
  large?: boolean;
  dark?: boolean;
  detachedResults?: boolean;
  searchBy: string;
  placeholder: string;
  labelField: string;
  valueField: string;
  options: APIData[];
  values: APIData[];
  searchable?: boolean;
  onChange?: (value: APIData[]) => void;
  sx?: ThemeUIStyleObject;
};
import SearchIcon from "../../../../public/images/magnifying-glass.svg";
import useFindApis from "hooks/useFindApis";
import { getIpfsLocation } from "utils/pathResolvers";

const SearchBox = ({
  dark,
  detachedResults,
  searchBy,
  placeholder,
  labelField,
  valueField,
  options,
  values,
  onChange,
  searchable = true,
  sx,
}: RDSProps) => {
  // Styling fix
  const forceUpdate: () => void = useState()[1].bind(null, {});
  useEffect(() => {
    setTimeout(() => forceUpdate(), 100);
  }, []);

  const [searchValue, setSearchValue] = useFindApis("");

  const bgs: Record<string, unknown> = {};
  options.map((opt, idx) => {
    const key = `.react-dropdown-select-item:nth-of-type(${idx + 1}):before`;
    bgs[key] = {
      background: `url(${ipfsGateway}${getIpfsLocation(opt)}${opt.icon.replace(
        "./",
        "/"
      )})`,
    };
  });

  const dropdownRenderer = ({
    props,
    state,
    methods,
  }: SelectRenderer<APIData>) => {
    return (
      <div className="dropdown-content">
        <div className="dropdown-search">
          <Input
            type="text"
            value={state.search}
            onChange={methods.setSearch}
            placeholder="Search wrappers"
            prefix={
              <SearchIcon
                alt="searchIcon"
                draggable={false}
                sx={styles.searchIcon}
              />
            }
          />
        </div>
        <ul className="dropdown-options">
          {props.options.map((option) => {
            return (
              <li
                key={option.id}
                className={`dropdown-item ${
                  state.values.find((value) => value.name === option.name)
                    ? "selected"
                    : ""
                }`}
                onClick={() => methods.addItem(option)}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  const handleSearch = useCallback(
    ({ state, methods, props }: SelectRenderer<APIData>) => {
      if (searchValue !== state.search) {
        setSearchValue(state.search);
        return;
      }
      const regexp = new RegExp(state.search, "i");

      return options.filter((item: any) =>
        regexp.test(item[props.searchBy] || item.label)
      );
    },
    [options]
  );
  return (
    <RDS
      sx={{
        ...styles.searchBox,
        color: dark ? "text" : "#598188 !important",
        ".react-dropdown-select-dropdown": {
          borderTop: detachedResults ? "0.125rem solid" : "0.0625rem solid",
          borderTopColor: detachedResults
            ? "polyBeige"
            : "rgba(104,129,132,.5)",
        },
        ...bgs,
        ...sx,
      }}
      keepSelectedInList
      searchBy={searchBy}
      placeholder={placeholder}
      dropdownHandle={true}
      dropdownRenderer={dropdownRenderer}
      labelField={labelField}
      valueField={valueField}
      options={options}
      values={values}
      onChange={onChange}
      searchable={searchable}
      searchFn={handleSearch}
      multi={false}
    />
  );
};

export default SearchBox;
