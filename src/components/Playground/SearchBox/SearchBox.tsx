/** @jsxImportSource theme-ui **/
import { useState, useEffect } from "react";
import { ThemeUIStyleObject } from "theme-ui";
import RDS from "react-dropdown-select";

import { APIData } from "hooks/ens/useGetAPIfromENS";
import stripIPFSPrefix from "utils/stripIPFSPrefix";
import { ipfsGateway } from "../../../constants";

import styles from "./styles";

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

  const bgs: Record<string, unknown> = {};
  options.map((opt, idx) => {
    const key = `.react-dropdown-select-item:nth-of-type(${idx + 1}):before`;
    bgs[key] = {
      background: `url(${ipfsGateway}${stripIPFSPrefix(
        opt.locationUri
      )}${opt.icon.replace("./", "/")})`,
    };
  });

  return (
    <RDS
      sx={{
        ...styles.searchBox,
        color: dark ? "text" : "#598188 !important",
        ".react-dropdown-select-dropdown": {
          borderTop: detachedResults ? "0.125rem solid" : "0.0625rem solid",
          borderTopColor: detachedResults ? "polyBeige" : "rgba(104,129,132,.5)",
        },
        ...bgs,
        ...sx,
      }}
      clearable
      keepSelectedInList
      searchBy={searchBy}
      placeholder={placeholder}
      dropdownHandle={false}
      labelField={labelField}
      valueField={valueField}
      options={options}
      values={values}
      onChange={onChange}
      searchable={searchable}
      multi={false}
    />
  );
};

export default SearchBox;
