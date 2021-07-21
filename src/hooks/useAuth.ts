import { useCallback, useEffect } from 'react'
import axios from 'axios'

import Auth from '../services/ceramic/auth'
import { githubHandler } from '../services/ceramic/handlers'
import { State } from '../state/initialState'
import { useStateValue } from '../state/state'

export const useAuth = (dapp: State['dapp']) => {
  const [state, dispatch] = useStateValue()
  const { github: cachedToken } = state.dapp

  useEffect(() => {
    const checkToken = async () => {
      const auth = await Auth.get('authentication')
      const ghAccessToken = auth?.github?.accessToken
      await githubHandler(ghAccessToken, cachedToken, dispatch)
    }

    if (state.dapp.did) {
      checkToken()
    }
  }, [state.dapp.did, cachedToken])

  const set = useCallback(
    async (key, values) => {
      if (Auth.idx.authenticated) {
        if (dapp.web3) return await Auth.set(key, values)
        // open connect modal
        return
      }
      await Auth.getInstance(dapp.web3)
    },
    [Auth, dapp],
  )

  const get = useCallback(
    async (key: string) => {
      if (Auth.idx.authenticated) {
        return await Auth.get(key)
      }
      await Auth.getInstance(dapp.web3)
    },
    [Auth, dapp],
  )

  const authenticate = useCallback(async () => {
    await Auth.getInstance(state.dapp.web3);

    if (Auth.ceramic.did?.authenticated) {
      // do a request to backend sending the DID
      // the backend will hash this DID and store it
      const { id } = Auth.ceramic.did
      await axios.post(`http://localhost:3000/api/auth/sign-in`, {
        did: id,
      })
      dispatch({
        type: 'SET_DID',
        payload: id,
      })
    }
  }, [Auth, dispatch])

  return { set, get, authenticate }
}
