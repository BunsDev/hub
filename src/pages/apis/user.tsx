/** @jsxImportSource theme-ui **/
import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex } from 'theme-ui'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import ContentNav from '../../components/ContentNav'
import Published from '../../components/tabs/Published'
import Favorites from '../../components/tabs/Favorites'
import BottomSpace from '../../components/BottomSpace'
import { useStateValue } from '../../state/state'
import { useAuth } from '../../hooks/useAuth'

const UserApis = () => {
  const router = useRouter()
  const [{ dapp }] = useStateValue()
  const [activeTab, setActiveTab] = useState<string | string[]>()
  const { authenticate } = useAuth(dapp)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    router.push(router.pathname + '?activeTab=' + tab)
  }

  useEffect(() => {
    if (!dapp.did) authenticate()
  }, [dapp.did])

  useEffect(() => {
    if (router.query.activeTab && !activeTab) {
      setActiveTab(router.query.activeTab)
    }
  }, [router.query.activeTab, activeTab])

  useEffect(() => {
    if (router.isReady && !router.query.activeTab) {
      router.push(router.pathname + '?activeTab=published')
    }
  }, [router.isReady, router.query?.activeTab, router.pathname])

  const { data: favoriteData } = useSWR(
    'http://localhost:3000/api/apis/favorites/user/' + dapp.did,
    {
      isPaused: () => !dapp.did,
    },
  )

  const { data: publishedData } = useSWR('http://localhost:3000/api/users/' + dapp.did, {
    isPaused: () => !dapp.did,
  })

  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents">
            <Header title="My API's" />
            <section className="content">
              <ContentNav
                setActiveTab={handleTabClick}
                activeTab={activeTab as string}
                tabs={[
                  {
                    label: 'Published',
                    count: publishedData?.apis?.length || 0,
                    data: publishedData?.apis || 0,
                  },
                  {
                    label: 'Favorites',
                    count: favoriteData?.count || 0,
                    data: favoriteData?.data || [],
                  },
                ]}
              />
              <br />
              {activeTab === 'published' && (
                <Published apis={publishedData?.apis || []} />
              )}
              {activeTab === 'favorites' && <Favorites apis={favoriteData?.data || []} />}
            </section>
            <BottomSpace />
          </div>
        </main>
      </Flex>
    </Layout>
  )
}

export default UserApis
