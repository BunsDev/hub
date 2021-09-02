export const UPLOAD_METHODS: {
  DIRECT_UPLOAD: string
  IPFS_HASH: string
  ENS_ADDRESS: string
} = {
  DIRECT_UPLOAD: 'direct',
  IPFS_HASH: 'ipfsHash',
  ENS_ADDRESS: 'ensAddress',
}

export const createApiSteps = ['start', 'upload', 'publish']

export const validStep = (stepInput: string) => createApiSteps.some((step) => stepInput === step)
export const validMethod = (methodInput: string) =>
  Object.values(UPLOAD_METHODS).some((method) => methodInput === method)
