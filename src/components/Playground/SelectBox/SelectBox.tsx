/** @jsxImportSource theme-ui **/
import styles from "./styles";

import { ThemeUIStyleObject } from "@theme-ui/css";
import RDS from "react-dropdown-select";

type RDSProps = {
  dark?: boolean;
  skinny?: boolean;
  labelField: string;
  placeholder: string;
  valueField: string;
  options: { id: string; value: string }[];
  values?: { id: string; value: string }[];
  onChange: (values: { id: string; value: string }[]) => void;
  sx?: ThemeUIStyleObject;
};

const SelectBox = ({
  dark,
  skinny,
  labelField,
  placeholder,
  valueField,
  options,
  values = [],
  onChange,
}: RDSProps) => {
  return (
    <RDS
      sx={{
        ...styles.selectBox,
        ".react-dropdown-select-item": {
          color: dark ? "white !important" : "text",
          height: skinny ? "2.25rem !important" : "3 !important.5rem",
        },
        ".react-dropdown-select-content": {
          span: {
            color: dark ? "white !important" : "text",
          },
        },
      }}
      keepSelectedInList
      placeholder={placeholder}
      dropdownHandle={true}
      labelField={labelField}
      valueField={valueField}
      options={options}
      values={values}
      onChange={onChange}
    />
  );
};

export default SelectBox;
