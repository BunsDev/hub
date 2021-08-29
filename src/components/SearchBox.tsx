/** @jsxImportSource theme-ui **/
import { cloudFlareGateway } from "../constants";
import { APIData } from "../hooks/ens/useGetAPIfromENS";
import stripIPFSPrefix from "../utils/stripIPFSPrefix";

import RDS from "react-dropdown-select";
import { useState, useEffect } from "react";

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
};

const SearchBox = ({
  large,
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
      background: `url(${cloudFlareGateway}${stripIPFSPrefix(
        opt.locationUri
      )}${opt.icon.replace("./", "/")})`,
    };
  });

  return (
    <RDS
      sx={{
        borderRadius: "1.125rem !important",
        width: large ? "100% !important" : "25rem !important",
        border: "0.125rem solid transparent !important",
        color: dark ? "text" : "#598188 !important",
        bg: dark ? "rgba(0, 0, 0, .32) !important" : "#EFF5F4 !important",
        p: "1rem !important",
        height: "2.5rem !important",
        '&[aria-expanded="true"]': {
          borderBottomLeftRadius: detachedResults
            ? "1.125rem !important"
            : "0 !important",
          borderBottomRightRadius: detachedResults
            ? "1.125rem !important"
            : "0 !important",
          borderBottomColor: detachedResults
            ? "text"
            : "transparent !important",
          "*": {
            color: dark ? "white !important" : "text",
          },
          ".react-dropdown-select-content": {
            "&::before": {
              background: "url(/images/magnifying-glass-white.svg) no-repeat",
            },
          },
        },
        ".react-dropdown-select-no-data": {
          color: "text",
        },
        "&:hover, &:focus-within": {
          borderColor: dark ? "text" : "transparent !important",
          boxShadow: "none !important",
        },
        ".react-dropdown-select-input": {
          color: dark ? "white !important" : "text",
          fontFamily: "Nunito Sans",
          fontSize: "1rem !important",
          fontWeight: "600",
          lineHeight: "100% !important",
          width: "12.5rem !important",
        },
        ".react-dropdown-select-clear": {
          fontSize: "1.5625rem !important",
          top: "-0.125rem !important",
          right: "-0.375rem !important",
        },
        ".react-dropdown-select-dropdown": {
          top: detachedResults ? "4.6875rem" : "3.625rem",
          bg: dark ? "w3shade1" : "#EFF5F4",
          color: "white",
          border: "0.125rem solid",
          borderColor: "w3beige",
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          borderTopLeftRadius: detachedResults ? "0.5rem" : "0rem",
          borderTopRightRadius: detachedResults ? "0.5rem" : "0rem",
          borderTop: detachedResults ? "0.125rem solid" : "0.0625rem solid",
          borderTopColor: detachedResults ? "w3beige" : "rgba(104,129,132,.5)",
          left: "-0.125rem",
          width: detachedResults ? "30%" : "calc(100% + 0.25rem) !important",
        },
        ".react-dropdown-select-item": {
          borderColor: "rgba(104,129,132,.5) !important",
          fontWeight: "bold !important",
          fontSize: "0.875rem !important",
          lineHeight: "0.875rem !important",
          color: dark ? "white !important" : "text",
          padding: "1rem 2rem !important",
          height: "3.5rem !important",
          display: "flex !important",
          alignItems: "center !important",
          justifyContent: "left !important",
          pl: "1.25rem !important",
          "&.react-dropdown-select-item-selected": {
            bg: dark ? "w3shade1 !important" : "#EFF5F4 !important",
            color: dark ? "white !important" : "text",
            borderBottomColor: "rgba(104,129,132,.5) !important",
          },
          "&:hover, &.react-dropdown-select-item-active": {
            bg: dark ? "w3shade3" : "w3TextNavTeal",
            color: dark ? "inherit" : "white",
          },
          "&::before": {
            display: "block !important",
            content: "''",
            width: "1.5rem !important",
            height: "1.5rem !important",
            mr: ".75rem !important",
          },
          "&:last-of-type": {
            borderBottom: "none !important",
          },
          "&:first-of-type": {
            borderTop: "none !important",
          },
        },
        ".react-dropdown-select-content": {
          "&::before": {
            display: "block !important",
            content: "''",
            width: "1.5rem !important",
            height: "1.5rem !important",
            mr: ".75rem !important",
            background:
              "url(/images/magnifying-glass.svg) no-repeat !important",
          },
          span: {
            pl: ".25rem",
            fontSize: "0.875rem",
            lineHeight: "150%",
            height: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        ...bgs,
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
