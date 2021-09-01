/** @jsxImportSource theme-ui **/
import { useRouter } from 'next/router'
import { ChangeEventHandler, useCallback, useEffect } from 'react'
import { Flex, Button, Input } from 'theme-ui'
import { MAIN_DOMAIN, ZERO_ADDRESS } from '../../constants'
import { createApiSteps } from '../../pages/apis/create'
import { getOwner } from '../../services/ens/getOwner'
import getMetaDataFromPackageHash from '../../services/ipfs/getMetaDataFromPackageHash'
import { useStateValue } from '../../state/state'

export const DirectUpload = () => {
  return <Wrapper>Direct Upload</Wrapper>
}
export const EnsAddress = () => {
  const [{ dapp, publish }, dispatch] = useStateValue()

  useEffect(() => {
    if (publish.subdomain !== '') {
      checkForENSAvailability(publish.subdomain)
    }
  }, [dapp.address])

  const checkForENSAvailability = useCallback(
    async (label: string) => {
      dispatch({ type: 'setsubdomainLoading', payload: true })
      try {
        const owner = await getOwner(`${label}.${MAIN_DOMAIN}`, dapp.web3)
        if (owner === ZERO_ADDRESS) {
          dispatch({ type: 'setsubdomainLookupSuccess', payload: true })
          dispatch({ type: 'setsubdomainError', payload: '' })
        } else {
          dispatch({ type: 'setsubdomainLookupSuccess', payload: false })
          dispatch({
            type: 'setsubdomainError',
            payload: 'Subdomain name is not available',
          })
        }
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'setsubdomainLoading', payload: false })
    },
    [dapp.web3],
  )

  const handleSubdomainChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    dispatch({ type: 'setsubdomain', payload: e.target.value })
    dispatch({ type: 'setsubdomainError', payload: '' })
    dispatch({ type: 'setsubdomainLookupSuccess', payload: false })
    if (e.target.value !== '') {
      checkForENSAvailability(e.target.value)
    }
  }
  const available = publish.subdomainLookupSuccess ? 'available' : ''
  const registered = publish.subdomainRegisterSuccess ? 'registered' : ''
  const registering = publish.subdomainLoading ? 'loading' : ''
  const registrationError = publish.subdomainError ? 'error' : ''

  const subdomainClasses = [available, registered, registering, registrationError].join(
    ' ',
  )
  return (
    <Wrapper>
      <div className="fieldset">
        <label>Input ENS Name</label>
        <div
          className={'inputwrap ' + subdomainClasses}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'max-content !important',
          }}
        >
          <Input
            type="text"
            name="ens"
            placeholder="{SUBDOMAIN}"
            required
            onChange={handleSubdomainChange}
            value={publish.subdomain}
          />
          <span sx={{ ml: 3 }}>.open.web3.eth</span>
          {publish.subdomainError && (
            <ErrorMsg bottomshift>{publish.subdomainError}</ErrorMsg>
          )}
        </div>
      </div>
      <NavButtons />
    </Wrapper>
  )
}
export const IPFSHash = () => {
  const [{ dapp, publish }, dispatch] = useStateValue()

  const ipfsClasses = publish.ipfsLoading
    ? 'loading'
    : publish.ipfsSuccess
    ? 'success'
    : publish.ipfsError
    ? 'error'
    : ''

  const handleIPFSHashInput: ChangeEventHandler<HTMLInputElement> = async (e) => {
    dispatch({ type: 'setipfs', payload: e.target.value })
    dispatch({ type: 'setipfsLoading', payload: true })
    dispatch({ type: 'setipfsSuccess', payload: false })
    dispatch({ type: 'setipfsError', payload: '' })
    if (e.target.value !== '') {
      let metaData = await getMetaDataFromPackageHash(e.target.value)
      if (metaData === undefined || metaData === 'NO METADATA FOUND') {
        dispatch({ type: 'setipfsLoading', payload: false })
        dispatch({ type: 'setApiData', payload: null })
        dispatch({ type: 'setipfsError', payload: 'No Package available' })
      } else {
        dispatch({ type: 'setipfsLoading', payload: false })
        dispatch({ type: 'setipfsSuccess', payload: true })
        dispatch({ type: 'setApiData', payload: metaData })
      }
    } else {
      dispatch({ type: 'setipfsLoading', payload: false })
    }
  }

  return (
    <Wrapper>
      <div className="fieldset">
        <label>Input IPFS</label>

        <div className={'inputwrap ' + ipfsClasses}>
          <Input
            type="text"
            name="ipfs"
            placeholder="QmPBWKRhX9aqQh4zsn..."
            required
            pattern="^Qm[1-9A-HJ-NP-Za-km-z]{44}(\/.*)?|^\/ipns\/.+"
            onChange={handleIPFSHashInput}
            value={publish.ipfs}
            disabled={publish.ipfsSuccess}
          />
        </div>
        {publish.ipfsError && <ErrorMsg>{publish.ipfsError}</ErrorMsg>}
      </div>
      <NavButtons />
    </Wrapper>
  )
}

type ErrorMsg = {
  children: React.ReactNode
  bottomshift?: boolean
}

// error component
const ErrorMsg = ({ children, bottomshift }: ErrorMsg) => (
  <span
    sx={{
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '-0.4000000059604645px',
      textAlign: 'left',
      color: 'rgba(255, 0, 0, 0.5)',
      mt: 2,
      position: bottomshift ? 'relative' : 'absolute',
    }}
  >
    {children}
  </span>
)

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    sx={{
      mt:'3.125rem',
      '.inputwrap': {
        '&:after': {
          display: 'block',
          position: 'absolute',
          right: '-2.5rem',
          top: 'calc(50% - 11px)',
          content: "''",
          width: '22px',
          height: '22px',
        },
        '&.loading': {
          '&:after': {
            animation: 'rotate 1s infinite linear',
            background: 'url(/images/loading.svg) no-repeat',
          },
        },
        '&.available': {
          '&:after': {
            background: 'url(/images/check-circle.svg) no-repeat',
          },
        },
        '&.registered': {
          '&:after': {
            background: 'url(/images/check-circle-green.svg) no-repeat',
          },
        },
        '&.error': {
          input: {
            borderColor: 'rgba(255, 0, 0, 0.5)',
          },
          '&:after': {
            background: 'url(/images/fail.svg) no-repeat',
          },
        },
      },
    }}
  >
    {children}
  </div>
)

const NavButtons = () => {
  const router = useRouter()

  return (
    <Flex sx={{ justifyContent: 'space-between', mt: '2.5rem' }}>
      <Button
        variant="secondaryMedium"
        onClick={(e) => {
          e.preventDefault()
          router.push(router.pathname + `?activeTab=${createApiSteps[0]}`)
        }}
      >
        Back
      </Button>
      <Button
        variant="primaryMedium"
        onClick={(e) => {
          e.preventDefault()
          router.push(router.pathname + `?activeTab=${createApiSteps[2]}`)
        }}
      >
        Next
      </Button>
    </Flex>
  )
}
