/** @jsxImportSource theme-ui **/

import { useRouter } from 'next/router'
import { Button, Flex, Themed } from 'theme-ui'

const UploadApiMode = () => {
  const router = useRouter()
  return (
    <div
      className="create"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(300px, 326px)',
        gap: '60px',
      }}
    >
      <Flex>
        <Flex
          sx={{
            gap: '1rem',
            div: {
              maxWidth: '14,1875rem',
              width: '100%',
              p: '1.75rem',
              background: '#0F0F0F',
              borderRadius: '20px',
              transition: '.2s background',
              '&:hover': {
                cursor: 'pointer',
                background: '#141D32',
              },
            },
          }}
        >
          <div>
            <Themed.h3>Direct Upload</Themed.h3>
            <p className="body-1">
              Drag and drop (input for file upload) -{'>'} system upload to ipfs -{'>'}{' '}
              create ENS record (input to ask ens name) (metamask)
            </p>
          </div>
          <div>
            <Themed.h3>Provide ENS Address</Themed.h3>
            <p className="body-1">(input for ENS) -{'>'} system get ipfs hash from ENS</p>
          </div>
          <div>
            <Themed.h3>Provide IPFS Hash</Themed.h3>
            <p className="body-1">
              (input for ipfs) -{'>'} ask "would you like to create ENS"
            </p>
          </div>
        </Flex>
        <div></div>
      </Flex>
      <Flex className="buttons">
        <Button
          variant="secondaryMedium"
          onClick={(e) => {
            e.preventDefault()
            router.push(router.pathname + '?activeTab=create')
          }}
        >
          Back
        </Button>
      </Flex>
    </div>
  )
}

export default UploadApiMode
