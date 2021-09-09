/** @jsxImportSource theme-ui **/
import {
  Input as ThemeUiInput,
  InputProps as ThemeUiInputProps,
  Flex,
  ThemeUIStyleObject,
} from 'theme-ui'

interface InputProps extends ThemeUiInputProps {
  suffix?: JSX.Element
  wrapperSx?: ThemeUIStyleObject
}

const Input = ({ suffix, wrapperSx, ...props }: InputProps) => {
  return (
    <Flex
      className="input-wrap"
      sx={{
        alignItems: 'center',
        bg: 'w3Grey3',
        borderRadius: '.5rem',
        height: '2.5rem',
        ...wrapperSx,
      }}
    >
      <ThemeUiInput
        sx={{
          border: 'none',
          pl: '1rem',
          height: '100%',
        }}
        {...props}
      />
      {suffix}
    </Flex>
  )
}
export default Input
