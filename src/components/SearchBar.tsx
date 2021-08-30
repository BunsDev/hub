/** @jsxImportSource theme-ui **/
import { useState, useEffect, useCallback } from 'react'
import { Flex, Input } from 'theme-ui'
import { cloudFlareGateway } from '../constants'
import { APIData } from '../hooks/ens/useGetAPIfromENS'
import stripIPFSPrefix from '../utils/stripIPFSPrefix'
import SearchIcon from '../../public/images/magnifying-glass.svg'
import router from 'next/router'

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>('')

  const handleSearch = useCallback((input: string) => {
    if (input) router.push(`/?search=${input?.trim()}`)
  }, [])

  return (
    <Flex
      className="search-wrap"
      sx={{
        alignItems: 'center',
        p: '0.625rem 0.75rem',
        background: 'rgba(0, 0, 0, 0.24)',
        borderRadius: '1.25rem',
      }}
    >
      <SearchIcon
        alt="searchIcon"
        draggable={false}
        sx={{
          cursor: 'pointer',
          userSelect: 'none',
          mr: '.5rem',
        }}
        onClick={() => handleSearch(searchValue)}
      />
      <Input
        className="search-input"
        type="search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch(searchValue)
        }}
        sx={{
          border: 'none',
          p: 0,
          height: '1rem',
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '100%',
          fontFamily: 'Nunito sans',
        }}
        placeholder="Search"
      />
    </Flex>
  )
}

export default SearchBar
