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
import Link from "next/link";

const Playground = () => {
  const [{ dapp }] = useStateValue();
  const router = useRouter();
  const { openModal } = useModal("connect");

  const { data: api, isLoading: apiDataLoading } = useGetAPIfromParamInURL();

  const [
    {
      apiContents: { queries, schema, schemaStructured },
      loading: apiContentLoading,
    },
    { execute, loading: queryLoading, method, setMethod },
  ] = usePlayground(api);

  const apiLoading = apiDataLoading || apiContentLoading;

  const [formVars, setFormVars] = useState({ value: "{\n}", error: null });

  const [schemaVisible, setSchemaVisible] = useState(false);

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
          // TODO case when no api on current network
          apiUri = `ens/${parsedUri}`;
          break;
        }
        case "ipfs": {
          apiUri = `ipfs/${parsedUri}`;
          break;
        }
      }
      void router.push(router.pathname + `?customUri=${apiUri}`);
    }
  };

  useEffect(() => {
    if (method) {
      const queryInfo = queries.find((q) => q.id === method.id);

      const newVars =
        queryInfo && queryInfo.vars ? JSON.parse(queryInfo.vars) : {};
      setFormVars({ value: JSON.stringify(newVars, null, 2), error: null });
    }
  }, [method]);

  useEffect(() => {
    if (queries.length) {
      handleQueryValuesChange(queries);
    }
  }, [queries]);

  const controlBtns = useMemo(() => {
    const exec = async () => {
      try {
        const parsed = JSON.parse(formVars.value);
        const response = await execute(parsed);
        setclientresponed(response);
      } catch (parseError) {
        setFormVars({ ...formVars, error: parseError });
      }
    };

    return (
      <>
        {queries &&
          (dapp?.address || !method?.value.startsWith("mutation") ? (
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
            onChange={() => {
              setSchemaVisible(false);
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
      <Flex className="subheader">
        {!apiDataLoading && api && (
          <>
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
            {!router.query.customUri && api && (
              <Link href={router.asPath.replace("query", "info")} shallow>
                <a>Open Wrapper Page</a>
              </Link>
            )}
          </>
        )}
      </Flex>
      <Flex className={`grid ${schemaVisible ? "withSchema" : ""}`}>
        <Flex className="query">
          <section className="templates">
            {apiLoading ? (
              <span className="loading_span">Loading Queries...</span>
            ) : (
              <>
                {queries.length > 0 && (
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
                )}
                {method?.value && (
                  <GQLCodeBlock
                    key={method.value}
                    value={method.value}
                    height={"200px"}
                    sx={{ ml: "-16px" }}
                  />
                )}
              </>
            )}
          </section>
          <section className="vars">
            <div className="subtitle-1">Vars</div>
            {!apiLoading && (
              <JSONEditor
                height="240px"
                value={formVars.value}
                handleEditorChange={handleVariableChanges}
              />
            )}
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
