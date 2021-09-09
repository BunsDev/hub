import { ChangeEventHandler, useEffect, useState } from 'react'
import { Input } from 'theme-ui'
import getMetaDataFromPackageHash from '../../../services/ipfs/getMetaDataFromPackageHash'
import { useStateValue } from '../../../state/state'
import ErrorMsg from '../ErrorMsg'
import NavButtons from '../NavButtons'
import { Wrapper } from '../Wrapper'
import useDebounce from '../../../utils/useDebounce'

export const IPFSHash = () => {
  const [{ publish }, dispatch] = useStateValue()

  const handleIPFSHashInput: ChangeEventHandler<HTMLInputElement> = async (e) => {
    dispatch({ type: 'setipfs', payload: e.target.value })
  }

  const debouncedIpfsInput = useDebounce(publish.ipfs, 500)

  useEffect(() => {
    //TODO reduce dispatch quantity
    if (debouncedIpfsInput) {
      dispatch({ type: 'setipfsLoading', payload: true })
      dispatch({ type: 'setipfsSuccess', payload: false })
      dispatch({ type: 'setipfsError', payload: '' })

      getMetaDataFromPackageHash(publish.ipfs).then((metaData) => {
        if (!metaData || metaData === 'NO METADATA FOUND') {
          dispatch({ type: 'setipfsLoading', payload: false })
          dispatch({ type: 'setApiData', payload: null })
          dispatch({ type: 'setipfsError', payload: 'No Package available' })
        } else {
          dispatch({ type: 'setipfsLoading', payload: false })
          dispatch({ type: 'setipfsSuccess', payload: true })
          dispatch({ type: 'setApiData', payload: metaData })
        }
      })
    } else {
      dispatch({ type: 'setipfsLoading', payload: false })
      dispatch({ type: 'setApiData', payload: null })
      dispatch({ type: 'setipfsError', payload: '' })
    }
  }, [debouncedIpfsInput])

  const ipfsClasses = publish.ipfsLoading
    ? 'loading'
    : publish.ipfsSuccess
    ? 'success'
    : publish.ipfsError
    ? 'error'
    : ''

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
