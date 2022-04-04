/** @jsxImportSource theme-ui **/
import { useRouter } from "next/router";
import { Grid, Button } from "theme-ui";
import { Card, Spinner } from "components";
import { useStateValue } from "hooks";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./styles";

const ApiGrid = () => {
  const router = useRouter();

  const [{ dapp }] = useStateValue();

  const getNext = () => {
    const page = (Number(router.query?.page || 1) + 1).toString();

    void router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: page,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="apiGrid" sx={styles.apiGrid}>
      {dapp.initialApisLoading ? (
        <Spinner size={215} />
      ) : (
        <InfiniteScroll
          next={getNext}
          loader={<Spinner size={215} />}
          dataLength={dapp.apis.items.length}
          hasMore={dapp.apis.items.length < dapp.apis.total}
          endMessage={
            dapp.apis.total > 0 && (
              <div className="endOfList">
                You reached the end of the list. <b>Don’t stop here!</b>
                <Button
                  variant="primaryMedium"
                  onClick={() => {
                    void router.push("/apis/create?activeTab=start");
                  }}
                >
                  <span>Create New API</span>
                </Button>
              </div>
            )
          }
        >
          {dapp?.apis?.items.length ? (
            <Grid className="grid-main" gap="1rem">
              {dapp?.apis?.items?.map((api, idx) => (
                <Card api={api} key={idx + "-api"} />
              ))}
            </Grid>
          ) : (
            dapp.apis.total <= 0 && (
              <div className="endOfList">
                <b>No Wrappers were found.</b>
                <Button
                  variant="primaryMedium"
                  onClick={() => {
                    void router.push(
                      "/apis/create?activeTab=start",
                      undefined,
                      {
                        shallow: true,
                      }
                    );
                  }}
                >
                  <span>Create New Wrapper</span>
                </Button>
              </div>
            )
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ApiGrid;
