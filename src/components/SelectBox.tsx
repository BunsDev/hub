/** @jsxImportSource theme-ui **/
import { APIData } from '../hooks/ens/useGetAPIfromENS'
import RDS from 'react-dropdown-select'

type RDSProps = {
  dark?: boolean
  skinny?: boolean
  labelField: string
  placeholder: string
  valueField: string
  options: { id: string; value: string }[]
  values?: { id: string; value: string }[]
  onChange: (values: { id: string; value: string }[]) => void
}

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
        border: 'none !important',
        color: 'text',
        '.react-dropdown-select-no-data': {
          color: 'text',
        },
        '&:hover, &:focus-within': {
          borderColor: 'text',
          boxShadow: 'none !important',
        },
        '.react-dropdown-select-clear': {
          fontSize: '1.5625rem !important',
          top: '-0.125rem !important',
          right: '-0.375rem !important',
        },
        '.react-dropdown-select-dropdown': {
          position:'absolute',
          top:'2.5rem',
          bg: 'black',
          color:'white',
        },
        '.react-dropdown-select-item': {
          borderColor: 'rgba(104,129,132,.5) !important',
          fontFamily: 'Montserrat !important',
          fontWeight: 'bold !important',
          fontSize: '0.875rem !important',
          lineHeight: '0.875rem !important',
          color: dark ? 'white !important' : 'text',
          padding: '1rem 2rem !important',
          height: skinny ? '2.25rem !important' : '3 !important.5rem',
          display: 'flex !important',
          alignItems: 'center !important',
          justifyContent: 'left !important',
          pl: '1.25rem !important',
          '&.react-dropdown-select-item-selected': {
            bg: dark ? 'w3shade1 !important' : 'white !important',
            borderBottomColor: 'inherit !important',
          },
          '&:hover': {
            bg: dark ? 'w3shade3 !important' : '#cad9f3 !important',
          },
          '&:last-of-type': {
            borderBottom: 'none !important',
          },
          '&:first-of-type': {
            borderTop: 'none !important',
          },
        },
        '.react-dropdown-select-content': {
          span: {
            height: '1.5rem !important',
            display: 'flex !important',
            flexDirection: 'column',
            alignItems: 'center !important',
            justifyContent: 'center !important',
            fontFamily: 'Montserrat !important',

            fontWeight: 'bold !important',
            fontSize: '0.875rem !important',
            lineHeight: '0.875rem !important',
            letterSpacing: '-0.004em !important',

            color: dark ? 'white !important' : 'text',
          },
        },
        '.react-dropdown-select-dropdown-handle:focus path': {
          stroke: 'none !important',
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
  )
}

export default SelectBox
