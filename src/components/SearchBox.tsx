/** @jsxImportSource theme-ui **/
import { APIData } from '../hooks/ens/useGetAPIfromENS'
import stripIPFSPrefix from '../utils/stripIPFSPrefix'

import RDS from 'react-dropdown-select'
import { useState, useEffect } from 'react'
import { ThemeUIStyleObject } from 'theme-ui'
import { ipfsGateway } from '../constants'

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
        opt.locationUri,
      )}${opt.icon.replace('./', '/')})`,
    }
  })

  return (
    <RDS
      sx={{
        borderRadius: "0.5rem !important",
        color: dark ? "text" : "#598188 !important",
        height: "2.5rem",
        width: "21.25rem !important",
        bg: "black",
        border: "none !important",
        boxShadow: "none !important",
        ".react-dropdown-select-no-data": {
          color: "text",
        },
        ".react-dropdown-select-clear": {
          fontSize: "1.5625rem !important",
          top: "-0.125rem !important",
          right: "-0.375rem !important",
        },
        ".react-dropdown-select-dropdown": {
          top: "3rem",
          bg: "black",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "1.25rem",
          boxShadow: "12px 20px 54px -6px #141316",
          borderTop: detachedResults ? "0.125rem solid" : "0.0625rem solid",
          borderTopColor: detachedResults ? "w3beige" : "rgba(104,129,132,.5)",
        },
        ".react-dropdown-select-item": {
          display: "flex",
          border: "none !important",
          lineHeight: "100%",
          py: "0.375rem",
          "&::before": {
            display: "block !important",
            content: "''",
            width: "1rem !important",
            height: "1rem !important",
            mr: ".75rem !important",
          },
          "&:hover, &.react-dropdown-select-item-selected": {
            bg: "rgba(255, 255, 255, 0.2)",
          },
          "&.react-dropdown-select-item-selected": {
            bg: "rgba(255, 255, 255, 0.4)",
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
            fontSize: "16px",
            lineHeight: "150%",
          },
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
