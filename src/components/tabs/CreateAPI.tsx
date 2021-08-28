/** @jsxImportSource theme-ui **/
import { useRouter } from 'next/router'
import {
  Select,
  Themed,
  Flex,
  Button,
  Input,
  Textarea,
  Label,
  ThemeUICSSObject,
} from 'theme-ui'

const styles: { [key: string]: ThemeUICSSObject } = {
  wrap: {
    display: 'grid',
    gridTemplateColumns: '1fr minmax(300px, 326px)',
    gap: '60px',
  },
  form: { display: 'flex', flexDirection: 'column' },
  tutorial: {
    flexDirection: 'column',
    gap: '1rem',
    div: {
      background: '#0F0F0F',
      borderRadius: '.5rem',
      p: '1rem',
      'span, a': {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.875rem',
        lineHeight: '120%',
      },
      li: {
        mb: '.5rem',
        img: { maxWidth: '1rem', mr: '.5rem' },
        a: { display: 'flex', alignItems: 'center' },
        '&:last-child': { mb: 0 },
      },
      pre: {
        m: '0',
        p: '0',
        bg: 'transparent',
      },
    },
  },
  buttons: { justifyContent: 'space-between', marginTop: 'auto' },
}
const CreateAPI = () => {
  const router = useRouter()
  return (
    <div className="create" sx={styles['wrap']}>
      <div className="form" sx={styles['form']}>
        <Flex sx={{ gap: '59px' }}>
          <div
            className="cover-upload"
            sx={{
              height: '162px',
              width: '162px',
              border: '1.5px dashed #FFFFFF',
              borderRadius: '20px',
            }}
          >
            <img />
          </div>
          <div
            className="form-items"
            sx={{
              flexGrow: 1,
              '>div': {
                mb: '2rem',
              },
            }}
          >
            <div>
              <Label htmlFor="hostConfig">Hosting Configuration</Label>
              <Select name="hostConfig">
                <option>IPFS + ENS</option>
                <option>Another</option>
                <option>And Another</option>
              </Select>
            </div>
            <div>
              <Label>Display name</Label>
              <Input />
            </div>
            <div>
              <Label>Subgraph description</Label>
              <Textarea />
            </div>
          </div>
        </Flex>
        <Flex className="buttons" sx={styles['buttons']}>
          <Button variant="secondaryMedium">Cancel</Button>
          <Button
            variant="primaryMedium"
            onClick={(e) => {
              e.preventDefault()
              router.push(router.pathname + '?activeTab=upload')
            }}
          >
            Get Started
          </Button>
        </Flex>
      </div>
      <Flex className="tutorial" sx={styles['tutorial']}>
        <div>
          <ul>
            <li>
              <a href="https://github.com/Web3Api/boilerplate" target="_BLANK">
                <img src="/images/link.svg" alt="icon" />
                Starter Repo
              </a>
            </li>
            <li>
              <a href="/" target="_BLANK">
                <img src="/images/link.svg" alt="icon" />
                First time developing with Web3API?
              </a>
            </li>
          </ul>
        </div>
        <div>
          <span sx={{ mb: 2 }}>Clone the starter repo to your local dev environment</span>
          <code>
            <pre>
              {`git clone https://github.com/web3api-start/uniswapv2 
cd uniswapv2
yarn install`}
            </pre>
          </code>
        </div>
        <div>
          <span>When ready deploy the package to IPFS using the following</span>
          <Themed.code>
            <Themed.pre>{`yarn codegen
yarn build
yarn deploy --IPFS`}</Themed.pre>
          </Themed.code>
        </div>
      </Flex>
    </div>
  )
}

export default CreateAPI
