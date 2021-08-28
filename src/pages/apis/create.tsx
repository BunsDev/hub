/** @jsxImportSource theme-ui **/
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Themed } from 'theme-ui'
import Layout from '../../components/Layout'
import CreateAPI from '../../components/tabs/CreateAPI'
import PublishAPI from '../../components/tabs/PublishAPI'
import Head from '../../components/Head'
import Navbar from '../../components/Navbar'
import BottomSpace from '../../components/BottomSpace'
import UploadApiMode from '../../components/tabs/UploadApiMode'
import Steps from '../../components/Steps'

const stepQueried: { [key: string]: string } = {
  create: 'Intro',
  upload: 'Upload',
  publish: 'Publish',
}

const styles = {
  height: 'fit-content',
  p: '50px 73px 59px 59px',
  background: 'black',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '12px 20px 54px -6px #141316',
  borderRadius: '20px',
}

const CreateApi = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState<string | string[]>()

  useEffect(() => {
    if (router.query.activeTab) {
      setActiveStep(router.query.activeTab)
    }
  }, [router.query.activeTab, activeStep])

  useEffect(() => {
    if (router.isReady && !router.query.activeTab) {
      router.push(router.pathname + '?activeTab=create')
      setActiveStep('create')
    }
  }, [router.isReady, router.query?.activeTab, router.pathname])

  return (
    <Layout>
      <Head />
      <Flex>
        <Navbar />
        <main sx={{ pb: 5, px: '75px' }}>
          <div className="contents" sx={styles}>
            <div
              className="header"
              sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}
            >
              <Themed.h2 sx={{ mb: '1.75rem' }}>Create New Wrapper</Themed.h2>
              <Steps activeStep={stepQueried[String(activeStep)]} />
            </div>
            <Box as="form" className="content">
              {activeStep === 'create' && <CreateAPI />}
              {activeStep === 'upload' && <UploadApiMode />}
            </Box>
            <BottomSpace />
          </div>
        </main>
      </Flex>
    </Layout>
  )
}

export default CreateApi
