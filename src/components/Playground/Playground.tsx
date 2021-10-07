/** @jsxImportSource theme-ui **/
import { networkName } from "../../constants";
import styles from "./styles";

import React, { MouseEventHandler, useEffect, useState } from "react";
import { Flex, Button, Themed } from "theme-ui";
import { QueryApiResult } from "@web3api/client-js";
import { useWeb3ApiQuery, useWeb3ApiClient } from "@web3api/react";
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
import { QueryAttributes } from "services/ipfs/getPackageQueriesFromAPIObject";
import cleanSchema, { StructuredSchema } from "utils/cleanSchema";
import stripIPFSPrefix from "utils/stripIPFSPrefix";
import getPackageQueriesFromUri from "services/ipfs/getPackageQueriesFromUri";
import { APIData, useGetAPIfromParamInURL } from "hooks/ens/useGetAPIfromENS";

interface APIContents {
  schema?: string;
  queries?: QueryAttributes[];
}

const Playground = () => {
  const [{ dapp }] = useStateValue();
  const router = useRouter();
  const client = useWeb3ApiClient();

  const { data: api } = useGetAPIfromParamInURL();

  const [schemaVisible, setSchemaVisible] = useState(false);

  const [searchboxvalues, setsearchboxvalues] = useState([]);
  const [customUri, setCustomUri] = useState(
    (router?.query?.customUri && router?.query?.customUri.toString()) || ""
  );

  const [apiContents, setapiContents] = useState<APIContents>();
  const [loadingPackageContents, setloadingPackageContents] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState("");
  const [newSelectedMethod, setnewSelectedMethod] = useState("");
  const [methodName, setMethodName] = useState("");

  const [structuredschema, setstructuredschema] = useState<StructuredSchema>();

  const [clientresponded, setclientresponed] =
    useState<QueryApiResult<Record<string, unknown>>>();

  const [formVarsToSubmit, setformVarsToSubmit] = useState({});

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
  const handleCustomUriApply: MouseEventHandler = (e) => {
    e.preventDefault();
    if (customUri) {
      router.push(router.pathname + `?customUri=${customUri}`);
    }
  };

  async function exec() {
    const response = await execute(formVarsToSubmit);
    setclientresponed(response);
  }

  useEffect(() => {
    api && setloadingPackageContents(true);
    async function go() {
      //const schemaData = await getPackageSchemaFromAPIObject(api);
      const apiUri = api?.apiUris[0];
      const schemaData = await client.getSchema(
        `ens/${networkName}/${api.apiUris[0]}`
      );
      const queriesData = await getPackageQueriesFromUri(
        client,
        api as APIData
      );

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
    api && void go();
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
        router?.query.uri.includes(api.apiUris[0].uri)
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
            options={dapp.apis}
            values={searchboxvalues}
            onChange={(values) => {
              setSchemaVisible(false);
              setsearchboxvalues(values);
              if (values.length > 0) {
                if (values[0]?.apiUris.length > 0) {
                  void router.push(
                    "/query?uri=/ens/" + values[0].apiUris[0].uri
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
            value={customUri}
            onChange={(e) => {
              setCustomUri(e.target.value);
            }}
            suffix={
              <Button
                onClick={handleCustomUriApply}
                className="btn-suffix"
                variant="suffixSmall"
              >
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
              {"favorites" in api && (
                <Stars count={api?.favorites || 0} onDark large />
              )}
              {"locationUri" in api && (
                <div className="category-Badges">
                  <Badge label="IPFS" onDark ipfsHash={api?.locationUri} />
                </div>
              )}
            </Flex>
          </Flex>
          <a href={router.asPath.replace("query", "info")}>Open Wrapper Page</a>
        </Flex>
      )}
      <Flex className={`grid ${schemaVisible ? "withSchema" : ""}`}>
        <Flex className="query">
          <section className="templates scrollable">
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
          <section className="vars scrollable">
            <div className="subtitle-1">Vars</div>
            <JSONEditor
              value={formVarsToSubmit}
              handleEditorChange={handleVariableChanges}
            />
          </section>
        </Flex>
        <Flex className="dynamic">
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
              <div className="body">
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
              </div>
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
        </Flex>
      </Flex>
    </div>
  );
};

export default Playground;
