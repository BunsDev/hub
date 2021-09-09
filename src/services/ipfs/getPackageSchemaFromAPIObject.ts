import { ipfsGateway } from '../../constants'
import axios from 'axios'
import { APIData } from '../../hooks/ens/useGetAPIfromENS'

export default async function getPackageSchema(api: APIData): Promise<string> {
  let schemaResponse = await axios.get(
    `${ipfsGateway}${api.locationUri}/schema.graphql`,
  )
  return schemaResponse.data
}
