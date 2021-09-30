/** @jsxImportSource theme-ui **/
import styles from "./styles";

import {
  Input as ThemeUiInput,
  InputProps as ThemeUiInputProps,
  Flex,
  ThemeUIStyleObject,
} from "theme-ui";

type ThemeUiInputPropsOmmited = Omit<ThemeUiInputProps, "prefix">;

interface InputProps extends ThemeUiInputPropsOmmited {
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  wrapperSx?: ThemeUIStyleObject;
}

const Input = ({ prefix, suffix, wrapperSx, ...props }: InputProps) => {
  return (
    <Flex className="input-wrap" sx={{ ...styles.inputWrap, ...wrapperSx }}>
      {prefix}
      <ThemeUiInput {...props} sx={{ ...styles.input, ...props.sx }} />
      {suffix}
    </Flex>
  );
};
export default Input;
