/** @jsxImportSource theme-ui **/
import React, { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { Flex, Button, Themed } from "theme-ui";
import { QueryApiResult } from "@web3api/core-js";
import { usePlayground, useRouter, useStateValue } from "hooks";
import {
  Stars,
  SelectBox,
  SearchBox,
  GQLCodeBlock,
  JSONEditor,
  Input,
  Spinner,
  LoadingSpinner,
} from "components";
import { useGetAPIfromParamInURL } from "hooks/ens/useGetAPIfromENS";
import { parseApiUri, resolveApiLocation } from "utils/pathResolvers";
import useModal from "hooks/useModal";
import styles from "./styles";
import { QueryAttributes } from "hooks/usePlayground";
import { networks } from "utils/networks";

const Playground = () => {
  const [{ dapp }] = useStateValue();
  const router = useRouter();
  const { openModal } = useModal("connect");

  const { data: api } = useGetAPIfromParamInURL();
  const [
    {
      apiContents: { queries, schema, schemaStructured },
      loading: apiLoading,
    },
    { execute, loading: queryLoading, errors, method, setMethod },
  ] = usePlayground(api);

  const [formVars, setFormVars] = useState({ value: "{\n}", error: null });

  const [schemaVisible, setSchemaVisible] = useState(false);

  const [searchboxvalues, setsearchboxvalues] = useState([]);

  const [customUri, setCustomUri] = useState(
    (router?.query?.customUri && router?.query?.customUri.toString()) || ""
  );

  const [clientresponded, setclientresponed] =
    useState<QueryApiResult<Record<string, unknown>>>();

  const handleQueryValuesChange = (method: QueryAttributes[]) => {
    setMethod(method[0]);
  };

  const handleSaveBtnClick = () => {
    const fileData = JSON.stringify(clientresponded);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `response.json`;
    link.href = url;
    link.click();
  };

  const handleVariableChanges = (e: string) => {
    setFormVars({ value: e, error: null });
  };

  const handleClearBtnClick = () => {
    setclientresponed(undefined);
  };

  const handleCustomUriApply: MouseEventHandler = (e) => {
    e.preventDefault();
    if (customUri) {
      const [parsedUri, type] = parseApiUri(customUri);
      let apiUri = "";
      switch (type) {
        case "ens": {
          const currentNetwork = networks[dapp.network].name;
          // TODO case when no api on current network
          apiUri = `ens/${parsedUri}`;
          break;
        }
        case "ipfs": {
          apiUri = `ipfs/${parsedUri}`;
          break;
        }
      }
      router.push(router.pathname + `?customUri=${apiUri}`);
    }
  };

  useEffect(() => {
    const queryInfo = queries.find((q) => q.id === method.id);

    const newVars =
      queryInfo && queryInfo.vars ? JSON.parse(queryInfo.vars) : {};
    setFormVars({ value: JSON.stringify(newVars, null, 2), error: null });
  }, [method]);

  useEffect(() => {
    if (router.query.uri !== undefined) {
      //TODO fix uri resolving, including all other places
      const apiInQuery = dapp.apis?.items?.find(
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

  useEffect(() => {
    if (queries.length) {
      handleQueryValuesChange(queries);
    }
  }, [queries]);

  const controlBtns = useMemo(() => {
    const exec = async () => {
      let parsed;
      try {
        parsed = JSON.parse(formVars.value);
      } catch (parseError) {
        setFormVars({ ...formVars, error: parseError });
        return;
      }
      const response = await execute(parsed);
      setclientresponed(response);
    };

    return (
      <>
        {queries &&
          (dapp?.address || !method.value.startsWith("mutation") ? (
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
  }, [queries, method, dapp?.address, formVars]);

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
            options={dapp.apis.items}
            values={searchboxvalues}
            onChange={(values) => {
              setSchemaVisible(false);
              setsearchboxvalues(values);
              values[0] &&
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
          {!customUri && (
            <a href={router.asPath.replace("query", "info")}>
              Open Wrapper Page
            </a>
          )}
        </Flex>
      )}
      <Flex className={`grid ${schemaVisible ? "withSchema" : ""}`}>
        <Flex className="query">
          <section className="templates">
            {apiLoading ? (
              <span className="loading_span">Loading Queries...</span>
            ) : (
              queries.length > 0 && (
                <SelectBox
                  key={"queries-box"}
                  skinny
                  labelField="id"
                  valueField="id"
                  placeholder={"Select Query"}
                  options={queries}
                  values={[queries[0]]}
                  onChange={handleQueryValuesChange}
                />
              )
            )}
            {method.value && (
              <GQLCodeBlock
                key={method.value}
                value={method.value}
                height={"200px"}
                sx={{ ml: "-16px" }}
              />
            )}
          </section>
          <section className="vars">
            <div className="subtitle-1">Vars</div>
            <JSONEditor
              value={formVars.value}
              handleEditorChange={handleVariableChanges}
            />
          </section>
        </Flex>
        <Flex className="dynamic">
          <div className="result">
            <section>
              <Flex className="controls">
                <Flex>{controlBtns}</Flex>
                {apiLoading
                  ? "Loading Schema..."
                  : schema &&
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
                  {queryLoading ? (
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
                      {formVars?.error && formVars.error.toString()}
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
              {schemaStructured && (
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
                      value={schemaStructured.localqueries}
                    />
                    <GQLCodeBlock
                      readOnly
                      title="Mutations"
                      value={schemaStructured.localmutations}
                    />
                    <GQLCodeBlock
                      readOnly
                      title="Custom Types"
                      value={schemaStructured.localcustom}
                    />
                    <GQLCodeBlock
                      readOnly
                      title="Imported Queries"
                      value={schemaStructured.importedqueries}
                    />
                    <GQLCodeBlock
                      readOnly
                      title="Imported Mutations"
                      value={schemaStructured.importedmutations}
                    />
                  </div>
                </>
              )}
            </section>
          </div>
        </Flex>
        {apiLoading && (
          <div className="spinner_wrap">
            <Spinner />
          </div>
        )}
      </Flex>
    </div>
  );
};

export default Playground;
