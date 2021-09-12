/** @jsxImportSource theme-ui **/
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
    <Flex
      className="input-wrap"
      sx={{
        alignItems: "center",
        bg: "w3Grey3",
        borderRadius: ".5rem",
        height: "2.5rem",
        ...wrapperSx,
      }}
    >
      {prefix}
      <ThemeUiInput
        sx={{
          border: "none",
          pl: "1rem",
          height: "100%",
        }}
        {...props}
      />
      {suffix}
    </Flex>
  );
};
export default Input;
