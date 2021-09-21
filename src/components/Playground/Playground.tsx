/** @jsxImportSource theme-ui **/
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
import { networkID } from "../../constants";
import { APIData } from "../../hooks/ens/useGetAPIfromENS";

import styles from "./styles";

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
            wrapperSx={{ width: "340px", maxWidth: "100%", bg: "black" }}
            placeholder="Enter wrapper URL"
            suffix={
              <Button
                variant="suffixSmall"
                sx={{
                  width: "65px",
                  alignSelf: "stretch",
                  borderRadius: "6px",
                  border: "none",
                  margin: "2px",
                  justifyContent: "center",
                  fontSize: "14px",
                  lineHeight: "120%",
                  fontWeight: "normal",
                }}
              >
                Apply
              </Button>
            }
          />
        </Flex>
      </Flex>
      {api && (
        <Flex className="subheader">
          <Flex sx={{ alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Themed.h3 sx={{ mr: [null, ".5rem"], width: [null, "100%"] }}>
              {api?.name || "Placeholder"}
            </Themed.h3>
            <Flex sx={{ mb: [null, "1.25rem"], gap: "1rem" }}>
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
          overflow: "hidden",
          ">div": {
            minHeight: "200px",
            minWidth: "200px",
            maxWidth: schemaVisible ? "398px" : "577px",
            width: schemaVisible
              ? ["100%", null, "calc((100vw - 4.6875rem)/3 - 2.5rem)"]
              : ["100%", null, "calc((100vw - 4.6875rem)/2 - 3rem)"],
            transition: ".2s all",
            borderRadius: "1.25rem",
            ">section": {
              minHeight: "17.5rem",
              backgroundColor: "black",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "1.25rem",
              boxShadow: "12px 20px 54px -6px #141316",
            },
          },
        }}
      >
        <Flex
          className="query"
          sx={{
            flexDirection: "column",
            gap: "1rem",
            section: { height: "50%" },
            overflow: "hidden",
          }}
        >
          <section className="templates" sx={{ p: "20px" }}>
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
            <div
              className="subtitle-1"
              sx={{
                p: "12px 16px",
                borderBottom: "1px solid rgba(255, 255, 255, .2)",
              }}
            >
              Vars
            </div>
            <JSONEditor
              value={formVarsToSubmit}
              handleEditorChange={handleVariableChanges}
            />
          </section>
        </Flex>
        <div className="result" sx={{ overflow: "hidden" }}>
          <section sx={{ height: "100%" }}>
            <Flex
              className="controls"
              sx={{
                justifyContent: "space-between",
                p: "1.25rem 1.5rem .75rem 1rem",
              }}
            >
              <Flex sx={{ gap: "1rem" }}>
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
                      sx={{
                        cursor: "pointer",
                        alignSelf: "flex-start",
                        lineHeight: "100%",
                      }}
                      onClick={() => {
                        setSchemaVisible(true);
                      }}
                    >
                      {`${"<"}`} Show Schema
                    </span>
                  )}
            </Flex>
            <Themed.pre
              sx={{ height: "100%", backgroundColor: "black", pb: 0, mb: 0 }}
            >
              {loading ? (
                <div
                  sx={{ display: "grid", placeItems: "center", height: "60%" }}
                >
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
          className="schema"
          sx={{
            position: "relative",
            bg: "black",
            minWidth: "0 !important",
            maxWidth: "339px",
            transition: ".2s all ease",
            width: schemaVisible ? "30vw" : "0 !important",
            overflowY: "scroll",
            height: [null, "270px"],
          }}
        >
          <section
            sx={{
              position: "absolute",
              top: 0,
              right: [null, 0],
              width: "100%",
            }}
          >
            {structuredschema && (
              <>
                <Flex
                  className="subtitle-1"
                  sx={{
                    position: "sticky",
                    top: "0",
                    bg: "black",
                    zIndex: "10",
                    justifyContent: "space-between",
                    p: "1.25rem 1.5rem .75rem 1rem",
                    borderBottom: "1px solid rgba(255, 255, 255, .2)",
                  }}
                >
                  <span>Schema</span>
                  <span
                    sx={{ cursor: "pointer" }}
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
