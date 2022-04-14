/** @jsxImportSource theme-ui **/
import { Themed } from "theme-ui";

export const getDefaultDocsNode = (
  apiLocation: string,
  suffix?: React.ReactNode
) => (
  <div>
    <Themed.h2>Get Started</Themed.h2>
    <Themed.h3>Install</Themed.h3>
    <Themed.code>
      <Themed.pre>{`yarn install @web3api/client`}</Themed.pre>
    </Themed.code>
    <Themed.h3>Initialize</Themed.h3>
    <Themed.code>
      <Themed.pre>
        {`import { Web3API, Ethereum, IPFS, Subgraph } from "@web3api/client-js";

const api = new Web3APIClient({
  uri: "${apiLocation}",
  portals: {
    ethereum: new Ethereum({ provider: (window as any).ethereum }),
    ipfs: new IPFS({ provider: "http://localhost:5001" }),
    subgraph: new Subgraph({ provider: "http://localhost:8020" })
  }
})`}
      </Themed.pre>
    </Themed.code>
    {suffix}
  </div>
);

export const getExampleQueryNode = (vars: string, query: string) => (
  <>
    <Themed.h3>Query</Themed.h3>
    <Themed.code>
      <Themed.pre>
        {`const variables = ${vars};

const result = await api.query({
query: \`${query}\`,
variables: variables
})
`}
      </Themed.pre>
    </Themed.code>
  </>
);
