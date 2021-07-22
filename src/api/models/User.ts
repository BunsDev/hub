import { Connection } from '../db'
import { Api } from './Api'

export enum AddressesTypes {
  ETHEREUM = 1,
}

export class User {
  public static async findOrCreate(did: string) {
    const db = Connection.getInstance()
    const connection = await db.connect()
    try {
      await connection.oneOrNone(
        'INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING RETURNING *',
        [did],
      )
    } catch (error) {
      console.log('Error on method: User.findOrCreate -> ', error.message)
      throw new Error(error)
    }
  }

  public static async find(did: string) {
    const db = Connection.getInstance()
    const connection = await db.connect()
    try {
      return await connection.oneOrNone('SELECT * FROM users WHERE id = $1', [did])
    } catch (error) {
      console.log('Error on method: User.find -> ', error.message)
      throw new Error(error)
    }
  }

  public static async getFavoritesCount(userId: string) {
    const db = Connection.getInstance()
    const connection = await db.connect()
    try {
      const userFavoritesCount = await connection.oneOrNone(
        `SELECT COUNT(*) FROM starred_apis WHERE fk_user_id = $1`,
        [userId],
      )
      return userFavoritesCount
    } catch (error) {
      console.log('Error on method: Api.getUserFavoritesCount() -> ', error.message)
      throw new Error(error)
    } finally {
      connection.done()
    }
  }

  public static async getFavorites(userId: string) {
    const db = Connection.getInstance()
    const connection = await db.connect()
    try {
      const apisData = await connection.manyOrNone(
        `SELECT apis.id, 
        apis.description, 
        apis.name, 
        apis.subtext,
        apis.icon, 
        uri_types.type as type, 
        api_uris.uri FROM apis 
        INNER JOIN api_uris ON apis.id = api_uris.fk_api_id 
        INNER JOIN uri_types ON uri_types.id = api_uris.fk_uri_type_id 
        INNER JOIN starred_apis ON apis.id = starred_apis.fk_api_id
        WHERE starred_apis.fk_owner_id = $1`,
        [userId],
      )
      if (!apisData.length) return null

      const apisSanitized = apisData.reduce(Api.sanitizeApis, [])
      return apisSanitized
    } catch (error) {
      console.log('Error on method: User.getFavorites() -> ', error.message)
      throw new Error(error)
    } finally {
      connection.done()
    }
  }
}
