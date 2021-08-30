/** @jsxImportSource theme-ui **/
import { Button, Flex, Grid, Input, Select, Themed } from 'theme-ui'
import { Global } from '@emotion/react'
import { Web3ApiProvider } from '@web3api/react'
import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'
import Playground from '../../components/Playground'
import { useStateValue } from '../../state/state'
import { useState } from 'react'

const PlaygroundPage = () => {
  const [{ web3api }] = useStateValue()
  return (
    <Layout>
      <Header />
      <Flex>
        <main>
          <div className="contents animate">
            {web3api.plugins && (
              <Web3ApiProvider plugins={web3api.plugins}>
                <Playground />
              </Web3ApiProvider>
            )}
          </div>
        </main>
      </Flex>
    </Layout>
  )
}

export default PlaygroundPage
