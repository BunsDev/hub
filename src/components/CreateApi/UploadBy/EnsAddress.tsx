import { ChangeEventHandler, useCallback, useEffect } from 'react'
import { Input } from 'theme-ui'
import { MAIN_DOMAIN, ZERO_ADDRESS } from '../../../constants'
import { getOwner } from '../../../services/ens/getOwner'
import { useStateValue } from '../../../state/state'
import ErrorMsg from '../ErrorMsg'
import NavButtons from '../NavButtons'
import { Wrapper } from '../Wrapper'

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
        <div className={'inputwrap ' + subdomainClasses}>
          <Input
            type="text"
            name="ens"
            placeholder="{SUBDOMAIN}"
            required
            onChange={handleSubdomainChange}
            value={publish.subdomain}
          />
          {/* <span sx={{ ml: 3 }}>.open.web3.eth</span> */}
        </div>
        {publish.subdomainError && (
          <ErrorMsg bottomshift>{publish.subdomainError}</ErrorMsg>
        )}
      </div>
      <NavButtons continueEnabled={publish.subdomainLookupSuccess} />
    </Wrapper>
  )
}

export default EnsAddress
