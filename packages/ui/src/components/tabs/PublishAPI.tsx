/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Input, Flex, Select, Button, Styled, Field } from 'theme-ui'
import Stars from '../Stars'
import Badge from '../Badge'
import Card from '../Card'

const PublishAPI = () => {
  return (
    <Flex className="publish">
      <form
        sx={{
          flex: 7,
          section: {
            mb: '3.375rem',
          },
          fieldset: {
            display: 'flex',
            alignItems: 'center',
            p: {
              fontFamily: 'Istok Web',
              fontSize: '1rem',
              lineHeight: '1.5rem',
              color: 'text',
            },
          },
          label: {
            width: '13.75rem',
            mr: '2.75rem',
            color: 'text',
            fontFamily: 'Montserrat',
            fontSize: '0.875rem',
            lineHeight: '1.375rem',
            letterSpacing: '-0.025rem',
            '+ *': { width: '30.25rem' },
          },
        }}
      >
        <section>
          <Styled.h4>Location</Styled.h4>
          <p>Point Web3hub to where your package has been uploaded.</p>
          <fieldset>
            <label>Package location</label>
            <Input
              type="text"
              placeholder="IPFS://fifmdoij9dfsjsd9fjwoefj09wej0f8rhwe98hrew98w09er"
            />
          </fieldset>
        </section>

        <section>
          <Styled.h4>Enable persistence</Styled.h4>
          <p>Ensure your package remains available</p>
          <fieldset>
            <label>Pinning service provider</label>
            <Select>
              <option>Web3API.org pinning service</option>
              <option>Another</option>
              <option>And Another</option>
            </Select>
          </fieldset>
        </section>
        <section>
          <Styled.h4>Where do you want to store your API</Styled.h4>
          <p>
            Register your package to an ENS domain and make it available on the Web3Hub.
          </p>
          <fieldset>
            <label>ENS Subdomain</label>
            <Field label="" name="ens" defaultValue="uniswapv2.open.web3.eth" />
          </fieldset>
        </section>
        <section>
          <fieldset>
            <label />
            <Flex>
              <Button>Register ENS</Button>
              <p sx={{ m: 0, ml: 3 }}>
                <small>This option will cost ~0.0023 ETH ($2.90 USD)</small>
                <br />
                <small>
                  Need ETH? Purcahse with your bank or card{' '}
                  <a href="https://www.moonpay.com/" target="_BLANK">
                    here
                  </a>
                </small>
              </p>
            </Flex>
          </fieldset>
        </section>
      </form>
      <Flex
        className="preview"
        sx={{
          flex: 3,
          textAlign: 'center',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div className="title">Package Preview</div>
        <div className="wrapper" sx={{ maxWidth: '17.5rem' }}>
          <Card boxShadowOn noHover />
        </div>
      </Flex>
    </Flex>
  )
}

export default PublishAPI
