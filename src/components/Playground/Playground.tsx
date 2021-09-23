/** @jsxImportSource theme-ui **/
import { networkID } from "../../constants";
import { APIData } from "../../hooks/ens/useGetAPIfromENS";
import styles from "./styles";

import React, { useEffect, useState } from "react";
import { Flex, Button, Themed, Grid } from "theme-ui";
import { QueryApiResult } from "@web3api/client-js";
import { useWeb3ApiQuery } from "@web3api/react";
import { useRouter, useStateValue } from "hooks";
import {
  Badge,
  Stars,
  SelectBox,
  SearchBox,
  LoadingSpinner,
  GQLCodeBlock,
  JSONEditor,
  Input,
} from "components";
import getPackageSchemaFromAPIObject from "services/ipfs/getPackageSchemaFromAPIObject";
import getPackageQueriesFromAPIObject, {
  QueryAttributes,
} from "services/ipfs/getPackageQueriesFromAPIObject";
import cleanSchema, { StructuredSchema } from "utils/cleanSchema";
import { networks } from "utils/networks";
import stripIPFSPrefix from "utils/stripIPFSPrefix";

type PlaygroundProps = {
  api?: APIData;
};

interface APIContents {
  schema?: string;
  queries?: QueryAttributes[];
}

const Playground = ({ api }: PlaygroundProps) => {
  const [{ dapp }] = useStateValue();
  const router = useRouter();

  const [schemaVisible, setSchemaVisible] = useState(false);
  const [apiOptions, setApiOptions] = useState(dapp.apis);

  const [searchboxvalues, setsearchboxvalues] = useState([]);

  const [apiContents, setapiContents] = useState<APIContents>();
  const [loadingPackageContents, setloadingPackageContents] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState("");
  const [newSelectedMethod, setnewSelectedMethod] = useState("");
  const [methodName, setMethodName] = useState("");

  const [structuredschema, setstructuredschema] = useState<StructuredSchema>();

  const [clientresponded, setclientresponed] =
    useState<QueryApiResult<Record<string, unknown>>>();

  const [formVarsToSubmit, setformVarsToSubmit] = useState({});
  const { name: networkName } = networks[networkID];

  const { loading, execute } = useWeb3ApiQuery({
    uri: `ens/${networkName}/${router.asPath.split("/playground/ens/")[1]}`,
    query: selectedMethod,
  });

  function handleQueryValuesChange(method: { value: string; id: string }[]) {
    setMethodName(method[0].id);
    setSelectedMethod(method[0].value);
  }

  function handleSaveBtnClick() {
    const fileData = JSON.stringify(clientresponded);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `response.json`;
    link.href = url;
    link.click();
  }

  const handleVariableChanges = (e: string) => {
    try {
      setformVarsToSubmit(JSON.parse(e));
    } catch (error) {
      // do nothing ?
    }
  };

  function handleClearBtnClick() {
    setclientresponed(undefined);
  }

  async function exec() {
    const response = await execute(formVarsToSubmit);
    setclientresponed(response);
  }

  useEffect(() => {
    setApiOptions(dapp.apis);
  }, [dapp.apis]);

  useEffect(() => {
    setloadingPackageContents(true);
    async function go() {
      const schemaData = await getPackageSchemaFromAPIObject(api);
      const queriesData = await getPackageQueriesFromAPIObject(api);
      queriesData.push({
        id: "custom",
        value: "\n\n\n\n\n\n\n\n\n\n",
      });
      setapiContents({
        schema: schemaData,
        queries: queriesData,
      });
      const {
        localqueries,
        localmutations,
        localcustom,
        importedqueries,
        importedmutations,
      } = cleanSchema(schemaData);
      setstructuredschema({
        localqueries: localqueries,
        localmutations: localmutations,
        localcustom: localcustom,
        importedqueries: importedqueries,
        importedmutations: importedmutations,
      });
      setloadingPackageContents(false);
    }
    if (loadingPackageContents && api) {
      void go();
    }
  }, [api]);

  useEffect(() => {
    if (selectedMethod !== newSelectedMethod) {
      setnewSelectedMethod(selectedMethod);
    }
  }, [selectedMethod]);

  useEffect(() => {
    const queryInfo =
      apiContents && apiContents.queries.find((q) => q.id === methodName);
    const newVars = queryInfo && queryInfo.recipe ? queryInfo.recipe : {};
    setformVarsToSubmit(newVars);
  }, [newSelectedMethod]);

  useEffect(() => {
    if (router.query.uri !== undefined) {
      const apiInQuery = dapp.apis?.find((api) =>
        router?.query.uri.includes(api.pointerUris[0])
      );
      if (apiInQuery) {
        setsearchboxvalues([apiInQuery]);
      }
    }
  }, [dapp.apis]);

  return (
    <div className="playground" sx={styles.playground}>
      <Flex className="head">
        <Themed.h1>Playground</Themed.h1>
        <Flex className="inputs-wrap">
          <SearchBox
            key={"search-api-box"}
            dark
            searchBy="name"
            placeholder={"Search API’s"}
            labelField="name"
            valueField="name"
            options={apiOptions}
            values={searchboxvalues}
            searchable={false}
            onChange={(values) => {
              setSchemaVisible(false);
              setsearchboxvalues(values);
              if (values.length > 0) {
                if (values[0]?.pointerUris.length > 0) {
                  void router.push(
                    "/query?uri=/ens/" + values[0].pointerUris[0]
                  );
                } else {
                  void router.push(
                    "/query?uri=/ipfs/" +
                      stripIPFSPrefix(values[0].locationUri[0])
                  );
                }
              }
            }}
          />
          <Input
            className="input-wrap"
            placeholder="Enter wrapper URL"
            suffix={
              <Button className="btn-suffix" variant="suffixSmall">
                Apply
              </Button>
            }
          />
        </Flex>
      </Flex>
      {api && (
        <Flex className="subheader">
          <Flex>
            <Themed.h3>{api?.name || "Placeholder"}</Themed.h3>
            <Flex className="labels">
              <Stars count={api?.favorites || 0} onDark large />
              {api?.locationUri && (
                <div className="category-Badges">
                  <Badge label="IPFS" onDark ipfsHash={api.locationUri} />
                </div>
              )}
            </Flex>
          </Flex>
          <a href={router.asPath.replace("query", "info")}>Open Wrapper Page</a>
        </Flex>
      )}
      <Grid
        className="grid"
        gap="1rem"
        columns={["1fr", "1fr", "min-content min-content min-content"]}
        sx={{
          ">div": {
            maxWidth: schemaVisible ? "398px" : "577px",
            width: schemaVisible
              ? ["100%", null, "calc((100vw - 4.6875rem)/3 - 2.5rem)"]
              : ["100%", null, "calc((100vw - 4.6875rem)/2 - 3rem)"],
          },
        }}
      >
        <Flex className="query">
          <section className="templates">
            {apiContents?.queries && (
              <SelectBox
                key={"queries-box"}
                skinny
                labelField="id"
                valueField="id"
                placeholder={"Select Query"}
                options={apiContents.queries}
                onChange={handleQueryValuesChange}
              />
            )}
            {selectedMethod !== "" && selectedMethod === newSelectedMethod && (
              <GQLCodeBlock
                key={newSelectedMethod}
                value={selectedMethod}
                height={"300px"}
                sx={{ ml: "-16px" }}
              />
            )}
          </section>
          <section className="vars">
            <div className="subtitle-1">Vars</div>
            <JSONEditor
              value={formVarsToSubmit}
              handleEditorChange={handleVariableChanges}
            />
          </section>
        </Flex>
        <div className="result">
          <section>
            <Flex className="controls">
              <Flex>
                {apiContents?.queries && (
                  <Button variant="primaryMedium" onClick={exec}>
                    Run
                  </Button>
                )}
                {clientresponded !== undefined && (
                  <React.Fragment>
                    <Button
                      variant="secondarySmall"
                      onClick={handleSaveBtnClick}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondarySmall"
                      onClick={handleClearBtnClick}
                    >
                      Clear
                    </Button>
                  </React.Fragment>
                )}
              </Flex>
              {loadingPackageContents
                ? "Loading Schema..."
                : apiContents?.schema &&
                  !schemaVisible && (
                    <span
                      onClick={() => {
                        setSchemaVisible(true);
                      }}
                    >
                      {`${"<"}`} Show Schema
                    </span>
                  )}
            </Flex>
            <Themed.pre>
              {loading ? (
                <div>
                  <LoadingSpinner />
                </div>
              ) : (
                <React.Fragment>
                  {clientresponded !== undefined &&
                    JSON.stringify(clientresponded.data, undefined, 2)}
                  {clientresponded !== undefined &&
                    clientresponded.errors !== undefined &&
                    clientresponded.errors.toString()}
                </React.Fragment>
              )}
            </Themed.pre>
          </section>
        </div>
        <div
          className="schema scrollable"
          sx={{
            width: schemaVisible ? "30vw" : "0 !important",
          }}
        >
          <section>
            {structuredschema && (
              <>
                <Flex className="subtitle-1">
                  <span>Schema</span>
                  <span
                    className="btn"
                    onClick={() => {
                      setSchemaVisible(false);
                    }}
                  >
                    {`${">"}`} Hide Schema
                  </span>
                </Flex>
                <div>
                  <GQLCodeBlock
                    readOnly
                    title="Queries"
                    value={structuredschema.localqueries}
                  />
                  <GQLCodeBlock
                    readOnly
                    title="Mutations"
                    value={structuredschema.localmutations}
                  />
                  <GQLCodeBlock
                    readOnly
                    title="Custom Types"
                    value={structuredschema.localcustom}
                  />
                  <GQLCodeBlock
                    readOnly
                    title="Imported Queries"
                    value={structuredschema.importedqueries}
                  />
                  <GQLCodeBlock
                    readOnly
                    title="Imported Mutations"
                    value={structuredschema.importedmutations}
                  />
                </div>
              </>
            )}
          </section>
        </div>
      </Grid>
    </div>
  );
};

export default Playground;
