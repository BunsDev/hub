import { VercelRequest, VercelResponse } from '@vercel/node'
import { User } from '../../../../../api/models/User'

const md5 = require('md5')

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'GET') {
    try {
      const { userDid } = request.query
      if (!userDid) {
        return response.json({
          status: 400,
          message: 'Attribute userDid not found in request query',
        })
      }

      const id = md5(userDid)

      const data = await User.getFavorites(id)
      const { count } = await User.getFavoritesCount(id)

      return response.json({
        status: 200,
        data,
        count,
      })
    } catch (error) {
      console.log({ error })
      return response.json({ status: 500, error: error.message })
    }
  }
}
