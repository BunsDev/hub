/** @jsxImportSource theme-ui **/
import { Flex, Select } from 'theme-ui'
import { useState, useEffect } from 'react'
import { useStateValue } from '../state/state'
import { APIData } from '../hooks/ens/useGetAPIfromENS'
import SearchBar from './SearchBar'

const SortNav = () => {
  const [{ dapp }, dispatch] = useStateValue()

  const [searchOptions, setsearchOptions] = useState(dapp.apis)
  const handleSearchValuesChange = (value: APIData[]) => {
    if (value.length === 0) {
      dispatch({
        type: 'sortSelectApi',
        payload: -1,
      })
    } else {
      dispatch({
        type: 'sortSelectApi',
        payload: value,
      })
    }
  }

  useEffect(() => {
    setsearchOptions(dapp.apis)
  }, [dapp.apis])

  return (
    <nav>
      <form>
        <Flex
          sx={{
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <h2 sx={{ fontSize: '28px' }}>Wrappers</h2>
          <SearchBar />
        </Flex>
      </form>
    </nav>
  )
}

export default SortNav
