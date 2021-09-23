/** @jsxImportSource theme-ui **/
import styles from "./styles";

import { useRouter } from "next/router";
import { Grid, Button } from "theme-ui";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import { Card } from "components";
import { useStateValue } from "hooks";

type ApiGridProps = {
  apis: APIData[];
  main?: boolean;
};

const ApiGrid = ({ apis, main }: ApiGridProps) => {
  const [{ search }] = useStateValue();

  const router = useRouter();
  return (
    <div className="apiGrid" sx={styles.apiGrid}>
      {main ? (
        <>
          <Grid className="grid-main" gap="1rem">
            {search !== undefined && search.sortedApi !== -1 ? (
              <Card api={search.sortedApi[0]} />
            ) : (
              apis.map((api, idx) => <Card api={api} key={idx + "-api"} />)
            )}
          </Grid>
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
        </>
      ) : (
        <Grid className="grid" gap={"3%"}>
          {apis.map((api, idx) => (
            <Card
              api={api}
              redirectUrl={"ens/" + api.pointerUris[0]}
              key={idx + "-api"}
            />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ApiGrid;
