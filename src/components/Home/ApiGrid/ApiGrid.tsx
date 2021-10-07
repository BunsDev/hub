/** @jsxImportSource theme-ui **/
import styles from "./styles";

import { useRouter } from "next/router";
import { Grid, Button } from "theme-ui";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import { Card } from "components";

type ApiGridProps = {
  apis: APIData[];
};

const ApiGrid = ({ apis }: ApiGridProps) => {
  const router = useRouter();
  return (
    <div className="apiGrid" sx={styles.apiGrid}>
      <>
        {apis && (
          <Grid className="grid-main" gap="1rem">
            {apis?.map((api, idx) => (
              <Card
                api={api}
                redirectUrl={"ens/" + api.apiUris[0]}
                key={idx + "-api"}
              />
            ))}
          </Grid>
        )}
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
    </div>
  );
};

export default ApiGrid;
