/** @jsxImportSource theme-ui **/
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Flex, Themed } from 'theme-ui'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
const SignInArea = dynamic(() => import('./SignInArea'), { ssr: false })
import onboardInit from '../utils/onboardInit'
import { useStateValue } from '../state/state'
import { APIData } from '../hooks/ens/useGetAPIfromENS'
import Navbar from './Navbar'

const Header = () => {
  const router = useRouter()
  const [{ dapp }, dispatch] = useStateValue()
  const [onboard, setOnboard] = useState<any>()

  const [searchOptions, setsearchOptions] = useState(dapp.apis)
  useEffect(() => {
    const onboard = onboardInit(dispatch)
    setOnboard(onboard)
  }, [])

  useEffect(() => {
    const previouslySelectedWallet = localStorage.getItem('selectedWallet')

    if (previouslySelectedWallet && onboard) {
      onboard?.walletSelect(previouslySelectedWallet)
    }
  }, [onboard])

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

  return (
    <header
      role="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pl: '2.365rem',
        pr: '2.5rem',
        maxHeight: '4.5625rem',
        background: 'transparent',
        '> *': { display: 'flex' },
        '.col': { flex: 2, '&:last-of-type': { justifyContent: 'flex-end' } },
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <Link href="/">
          <a
            sx={{
              display: 'flex',
              height: '100%',
              mr: '3.125rem',
            }}
          >
            <img src="/images/logo.svg" alt="logo" />
          </a>
        </Link>
        <Navbar />
      </Flex>
      <Flex sx={{ justifyItems: 'flex-end', gap: '1.5rem' }}>
        <SignInArea onDark />
      </Flex>
    </header>
  )
}

export default Header
