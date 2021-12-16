/** @jsxImportSource theme-ui **/
import styles from "./styles";

import React, { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { Flex, Button, Themed } from "theme-ui";
import { QueryApiResult } from "@web3api/core-js";
import { useWeb3ApiQuery, useWeb3ApiClient } from "@web3api/react";
import { useRouter, useStateValue } from "hooks";
import {
  Stars,
  SelectBox,
  SearchBox,
  LoadingSpinner,
  GQLCodeBlock,
  JSONEditor,
  Input,
  Spinner,
} from "components";
import cleanSchema, { StructuredSchema } from "utils/cleanSchema";
import getPackageQueriesFromUri from "services/ipfs/getPackageQueriesFromUri";
import { useGetAPIfromParamInURL } from "hooks/ens/useGetAPIfromENS";
import { resolveApiLocation } from "utils/pathResolvers";
import useModal from "hooks/useModal";
import { networks } from "utils/networks";

export interface QueryAttributes {
  id: string;
  value: string;
  recipe?: string;
}

interface APIContents {
  schema?: string;
  queries?: QueryAttributes[];
}

const Playground = () => {
  const [{ dapp }] = useStateValue();
  const router = useRouter();
  const client = useWeb3ApiClient();
  const { openModal } = useModal("connect");

  const { data: api, isLoading } = useGetAPIfromParamInURL();

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

  const networkName = useMemo(() => {
    return networks[dapp?.network]?.name || "mainnet";
  }, [dapp?.network]);

  const [location, uri] = useMemo(
    () => (api ? (api.apiUris[0] as string)?.split("/") : ["", ""]),
    [api]
  );
  const apiLocation = useMemo(
    () =>
      location === "ipfs"
        ? `${location}/${uri}`
        : `${location}/${networks[dapp?.network]?.name || "mainnet"}/${uri}`,
    [location, uri]
  );

  const { loading, execute } = useWeb3ApiQuery({
    uri: uri && apiLocation,
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
    async function go() {
      setloadingPackageContents(true);
      const schemaData = await client.getSchema(apiLocation);
      const queriesData = await getPackageQueriesFromUri(client, apiLocation);

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
  }, [api, uri, networkName]);

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
      //TODO fix uri resolving, including all other places
      const apiInQuery = dapp.apis?.find(
        (dapi) =>
          dapi.apiUris.some((api) =>
            api.uri.includes(router?.query?.uri.toString().split("/")[1])
          ) || dapi.locationUri === router?.query?.uri.toString().split("/")[1]
      );
      if (apiInQuery) {
        setsearchboxvalues([apiInQuery]);
      }
    }
  }, [dapp.apis]);

  const controlBtns = useMemo(() => {
    return (
      <>
        {apiContents?.queries &&
          (dapp?.address || !selectedMethod.startsWith("mutation") ? (
            <>
              <Button variant="primaryMedium" onClick={exec}>
                Run
              </Button>
              {clientresponded !== undefined && (
                <React.Fragment>
                  <Button variant="secondarySmall" onClick={handleSaveBtnClick}>
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
            </>
          ) : (
            <Button variant="primaryMedium" onClick={() => openModal()}>
              Log in
            </Button>
          ))}
      </>
    );
  }, [apiContents?.queries, selectedMethod, dapp?.address]);

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
              void router.push(`/query?uri=${resolveApiLocation(values[0])}`);
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
              {/*               {"locationUri" in api && (
                <div className="category-Badges">
                  <Badge label="IPFS" onDark ipfsHash={api?.apiUris[0].uri} />
                </div>
              )} */}
            </Flex>
          </Flex>
          <a href={router.asPath.replace("query", "info")}>Open Wrapper Page</a>
        </Flex>
      )}
      <Flex className={`grid ${schemaVisible ? "withSchema" : ""}`}>
        <Flex className="query">
          <section className="templates">
            {loadingPackageContents ? (
              <span className="loading_span">Loading Queries...</span>
            ) : (
              apiContents?.queries && (
                <SelectBox
                  key={"queries-box"}
                  skinny
                  labelField="id"
                  valueField="id"
                  placeholder={"Select Query"}
                  options={apiContents.queries}
                  onChange={handleQueryValuesChange}
                />
              )
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
        <Flex className="dynamic">
          <div className="result">
            <section>
              <Flex className="controls">
                <Flex>{controlBtns}</Flex>
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
            className="schema"
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
                  <div className="scrollable">
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
        {(isLoading || loadingPackageContents) && (
          <div className="spinner_wrap">
            <Spinner />
          </div>
        )}
      </Flex>
    </div>
  );
};

export default Playground;
