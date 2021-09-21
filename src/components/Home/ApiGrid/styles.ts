import { Styles } from "utils/stylesInterface";

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

export default styles