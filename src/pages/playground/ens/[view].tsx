/** @jsxImportSource theme-ui **/
import { Flex, Themed } from 'theme-ui'
import { Global } from '@emotion/react'
import { useRouter } from 'next/router'
import { Web3ApiProvider } from '@web3api/react'
import Layout from '../../../components/Layout'
import Navbar from '../../../components/Navbar'
import Header from '../../../components/Header'
import Playground from '../../../components/Playground'

import { useGetAPIfromENSParamInURL } from '../../../hooks/ens/useGetAPIfromENS'
import { useStateValue } from '../../../state/state'
import { useEffect } from 'react'
import Modal from '../../../components/Modal'

const PlaygroundPage = () => {
  const router = useRouter()
  const [
    {
      web3api,
      dapp,
      publish: { showSignInModal },
    },
    dispatch,
  ] = useStateValue()
  const { data } = useGetAPIfromENSParamInURL()

  if (router.asPath !== '/playground' && !router.asPath.includes('/playground/ens/')) {
    router.push('/playground')
  }

  useEffect(() => {
    const previouslySelectedWallet = localStorage.getItem('selectedWallet')

    if (!dapp.web3 && !previouslySelectedWallet) {
      dispatch({ type: 'setShowSignInModal', payload: true })
    }
  }, [dapp.web3])
  return (
    <Layout>
      <Header />
      <Flex>
        {showSignInModal && !dapp.web3 && (
          <div sx={{ position: 'fixed', top: 0, left: 0, zIndex: 100000 }}>
            <Modal
              screen={'connect'}
              noLeftShift
              close={() => {
                dispatch({ type: 'setShowConnectModal', payload: false })
              }}
            />{' '}
          </div>
        )}
        <main>
          <div className="contents animate">
            {data !== null && web3api.plugins && (
              <Web3ApiProvider plugins={web3api.plugins}>
                <Playground api={data} />
              </Web3ApiProvider>
            )}
          </div>
        </main>
      </Flex>
    </Layout>
  )
}

export default PlaygroundPage
