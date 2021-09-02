import { ChangeEventHandler } from 'react'
import { Input } from 'theme-ui'
import getMetaDataFromPackageHash from '../../../services/ipfs/getMetaDataFromPackageHash'
import { useStateValue } from '../../../state/state'
import ErrorMsg from '../ErrorMsg'
import NavButtons from '../NavButtons'
import { Wrapper } from '../Wrapper'

export const IPFSHash = () => {
  const [{ publish }, dispatch] = useStateValue()

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
      <NavButtons continueEnabled={publish.ipfsSuccess} />
    </Wrapper>
  )
}

export default IPFSHash
