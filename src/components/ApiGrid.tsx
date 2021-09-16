/** @jsxImportSource theme-ui **/
import { APIData } from "../hooks/ens/useGetAPIfromENS";
import Card from "./Card";
import { useStateValue } from "../state/state";

import { useRouter } from "next/router";
import { Grid, Button } from "theme-ui";
import { Styles } from "../utils/stylesInterface";

type ApiGridProps = {
  apis: APIData[];
  main?: boolean;
};

const gridTemplateColumn = "minmax(300px, 380px)";

const styles: Styles = {
  apiGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "70vh",
    ".grid-main": {
      gridTemplateColumns: [
        `${gridTemplateColumn} ${gridTemplateColumn} ${gridTemplateColumn}`,
        `${gridTemplateColumn}`,
      ],
      mx: "auto",
      mb: 3,
    },
    ".endOfList": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignSelf: "center",
      textAlign: "center",
      mb: 4,
      button: { mt: "14px" },
    },
    ".grid": {
      gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"],
      rowGap: ["1%", "2%", "3%", "4%"],
    },
  },
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
              <Card api={search.sortedApi[0]} boxShadowOn />
            ) : (
              apis.map((api, idx) => (
                <Card api={api} boxShadowOn key={idx + "-api"} />
              ))
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
              boxShadowOn
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
