import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  playground: {
    width: "100%",
    "code, pre, textarea": {
      border: "none",
      fontSize: "0.875rem",
      lineHeight: "0.875rem",
      pt: "3.25rem",
    },
    ".head": {
      justifyContent: "space-between",
      flexWrap: "wrap",
      mb: "2.25rem",
      ".inputs-wrap": {
        width: [null, "340px"],
        maxWidth: "100%",
        gap: "1rem",
        flexWrap: "wrap",
        ">div": { width: [null, "100%"] },
      },
    },
    ".subheader": {
      justifyContent: "space-between",
      flexWrap: "wrap",
      mb: "1.25rem",
      ">a": {
        backgroundColor: "white",
        p: ["10px 18px", "20px 0"],
        color: "#141417",
        borderRadius: ["1.25rem", "100px"],
        fontWeight: "bold",
        lineHeight: "100%",
        textAlign: "center",
        width: [null, "100%"],
      },
    },
  },
  grid: {
    overflow: "hidden",
    ">div": {
      minHeight: "200px",
      minWidth: "200px",
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
    ".query": {
      maxWidth: "339px",
      flexDirection: "column",
      gap: "1rem",
      section: { height: "50%" },
      overflow: "hidden",
    },
  },
};

export default styles;
