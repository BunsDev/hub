/** @jsxImportSource theme-ui **/
import { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Themed } from 'theme-ui'
import Layout from '../../components/Layout'
import Publish from '../../components/CreateApi/Publish'
import Header from '../../components/Header'
import UploadApiMethod from '../../components/CreateApi/Start'
import Steps from '../../components/Steps'
import { DirectUpload, EnsAddress, IPFSHash } from '../../components/CreateApi/UploadBy'
import {
  createApiSteps,
  UPLOAD_METHODS,
  validMethod,
  validStep,
} from '../../utils/createWrapper'

const styles = {
  height: 'fit-content',
  p: '50px 73px 59px 59px',
  background: 'black',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '12px 20px 54px -6px #141316',
  borderRadius: '20px',
}

export const uploadComponents = {
  [UPLOAD_METHODS.DIRECT_UPLOAD]: <DirectUpload />,
  [UPLOAD_METHODS.IPFS_HASH]: <IPFSHash />,
  [UPLOAD_METHODS.ENS_ADDRESS]: <EnsAddress />,
}

export const CreateApiContext = createContext<{
  uploadMethod: string
  setUploadMethod: Dispatch<SetStateAction<string>>
}>({
  uploadMethod: '',
  setUploadMethod: () => {},
})

const CreateApi = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState<string>()
  const [uploadMethod, setUploadMethod] = useState<string>('')

  useEffect(() => {
    if (router.query.activeTab) {
      setActiveStep(router.query.activeTab as string)
    }
  }, [router.query?.activeTab])

  useEffect(() => {
    if (router.query.method) {
      setUploadMethod(router.query.method as string)
    }
  }, [router.query?.method])

  useEffect(() => {
    if (
      router.isReady &&
      (!validStep(router.query?.activeTab as string) ||
        (router.query.method && !validMethod(router.query?.method as string)))
    ) {
      router.push(router.pathname + `?activeTab=${createApiSteps[0]}`)
    }
  }, [router.isReady, router.query?.activeTab, router.query?.method, router.pathname])

  return (
    <Layout>
      <Header />
      <CreateApiContext.Provider value={{ uploadMethod, setUploadMethod }}>
        <Flex>
          <main sx={{ pb: 5, px: '10.3125rem' }}>
            <div className="contents" sx={styles}>
              <Flex
                className="header"
                sx={{
                  justifyContent: 'space-between',
                  mb: '.75rem',
                }}
              >
                <Themed.h2 sx={{ mb: 0 }}>Create New Wrapper</Themed.h2>
                <Steps activeStep={activeStep} />
              </Flex>
              <Box as="form" className="content">
                {activeStep === createApiSteps[0] && <UploadApiMethod />}
                {activeStep === createApiSteps[1] && uploadComponents[uploadMethod]}
                {activeStep === createApiSteps[2] && <Publish />}
              </Box>
            </div>
          </main>
        </Flex>
      </CreateApiContext.Provider>
    </Layout>
  )
}

export default CreateApi
