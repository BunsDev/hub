/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import Layout from '../components/Layout'
import SortNav from '../components/SortNav'
import ApiGrid from '../components/ApiGrid'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BGWave from '../components/BGWave'
import BottomSpace from '../components/BottomSpace'

const Index = () => {
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents">
            <Header title="Browse APIs"/>
            <section className="content">
              <SortNav />
              <ApiGrid />
            </section>
            <BottomSpace/>
          </div>
        </main>
      </Flex>
      <BGWave light/>
    </Layout>
  )
}

export default Index
