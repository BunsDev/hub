/** @jsxImportSource theme-ui **/
import { useState, useEffect, useCallback } from "react";
import { ThemeUIStyleObject } from "theme-ui";
import RDS, { SelectRenderer } from "react-dropdown-select";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import { domain, ipfsGateway } from "../../../constants";

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
  searchable?: boolean;
  onChange?: (props?: any) => void;
  sx?: ThemeUIStyleObject;
};
import SearchIcon from "../../../../public/images/magnifying-glass.svg";
import {
  getIpfsLocation,
  parseApiUri,
  resolveApiLocation,
} from "utils/pathResolvers";
import axios from "axios";
import { useDebounce, useRouter } from "hooks";

const SearchBox = ({
  dark,
  detachedResults,
  searchBy,
  placeholder,
  labelField,
  valueField,
  onChange,
  searchable = true,
  sx,
}: RDSProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [deboucedValue] = useDebounce(searchValue, 500);
  const [selectedValues, setSelectedValues] = useState<APIData[]>();
  const router = useRouter();
  const [{ data: options, loading, error }, setState] = useState<{
    data: APIData[];
    loading: boolean;
    error: string;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const getApis = async () => {
      setState((state) => ({ ...state, loading: true }));

      const params = {};
      const apiUriInQuery = router.query.uri;

      if (deboucedValue || apiUriInQuery) {
        //@ts-ignore
        params.search =
          deboucedValue ||
          (apiUriInQuery && parseApiUri(apiUriInQuery.toString())[0]);
      }

      const {
        data: {
          apis: { apis },
        },
      } = await axios.get(domain + `/api/apis/active`, {
        params,
      });

      setState({ data: apis, loading: false, error: null });
    };
    if (typeof deboucedValue === "string") {
      getApis();
    }
  }, [deboucedValue]);

  useEffect(() => {
    if (router.query.uri !== undefined) {
      //TODO fix uri resolving, including all other places
      const apiInQuery = options?.find(
        (dapi) =>
          dapi.apiUris.some((api) =>
            api.uri.includes(router?.query?.uri.toString().split("/")[1])
          ) || dapi.locationUri === router?.query?.uri.toString().split("/")[1]
      );
      if (apiInQuery) {
        //@ts-ignore
        setSelectedValues([apiInQuery]);
      }
    }
  }, [options]);

  useEffect(() => {
    if (router.query.customUri) {
      setSelectedValues([]);
    }
  }, [router.query.customUri]);

  const bgs: Record<string, unknown> = {};
  options &&
    options?.map((opt: any, idx: number) => {
      const key = `.react-dropdown-select-item:nth-of-type(${idx + 1}):before`;
      bgs[key] = {
        background: `url(${ipfsGateway}${getIpfsLocation(
          opt
        )}${opt.icon.replace("./", "/")})`,
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
          {loading ? (
            <div sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
              Loading...
            </div>
          ) : props?.options?.length ? (
            props?.options?.map((option) => {
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
            })
          ) : (
            <li className={`dropdown-item empty`}>No results</li>
          )}
        </ul>
      </div>
    );
  };
  const handleSearch = useCallback(
    ({ state, props }: SelectRenderer<APIData>) => {
      if (searchValue !== state.search) {
        setSearchValue(state.search);
        return;
      }
      const regexp = new RegExp(state.search, "i");

      return options.filter((item: APIData) =>
        //@ts-ignore
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
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: ".75vw",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#171717",
            borderRadius: "20px",
            transition: ".2s all",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#393939",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        },
        ...bgs,
        ...sx,
      }}
      keepSelectedInList
      searchBy={searchBy}
      placeholder={placeholder}
      dropdownHandle={true}
      wrapperClassName={"scrol2"}
      dropdownRenderer={dropdownRenderer}
      labelField={labelField}
      valueField={valueField}
      loading={loading}
      options={options}
      values={selectedValues}
      onChange={(values) => {
        onChange && onChange();
        setSelectedValues(values);
        values[0] &&
          void router.push(`/query?uri=${resolveApiLocation(values[0])}`);
      }}
      searchable={searchable}
      searchFn={handleSearch}
      multi={false}
    />
  );
};

export default SearchBox;
