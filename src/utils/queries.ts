export const registerDomainQuery = `mutation {
  registerDomain(
    domain: $domain
    owner: $owner
    registrarAddress: $registrarAddress
    registryAddress: $registryAddress
    connection: {
      networkNameOrChainId: $network
    }
  )
}`;

export const setContentHashQuery = `mutation {
  setContentHash(
    domain: $domain
    cid: $cid
    resolverAddress: $resolverAddress
    connection: {
      networkNameOrChainId: $network
    }
  )
}`;

export const setResolverQuery = `mutation {
  setResolver(
    domain: $domain
    resolverAddress: $resolverAddress
    registryAddress: $registryAddress
    connection: {
      networkNameOrChainId: $network
    }
  )
}`;
