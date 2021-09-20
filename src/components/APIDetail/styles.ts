import { Styles } from "../../utils/stylesInterface";

const styles: Styles = {
  wrap: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: [null, "column-reverse"],
    gap: "1rem",
    width: "100%",
    p: ["3.75rem", "1.25rem"],
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    boxShadow: "12px 20px 54px -6px #141316",
    bg: "black",
    ".left": {
      flexDirection: "column",
      width: "100%",
      maxWidth: "40rem",
      ".head": {
        gridTemplateColumns: ["min-content 1fr", "min-content"],
        gridTemplateRows: ["min-content", "min-content min-content"],
        gridTemplateAreas: [
          `'logo title'
         'logo description'`,
          `'logo title'
         'description description'`,
        ],
        alignItems: "flex-start",
        gap: ["40px", ".75rem"],
        rowGap: "0",
        mb: ["32px", "40px"],
        "img.api-logo": {
          gridArea: `logo`,
          width: "6.25rem",
          height: "6.25rem",
          borderRadius: "20px",
        },
        "h2.title": {
          gridArea: "title",
          mb: [".75rem", "1.25rem"],
          fontSize: [null, "20px"],
        },
        ".subtitle": {
          color: "#FFF",
          mb: ".75rem",
          fontSize: "1rem",
          fontWeight: "bold",
        },
        "p.description": {
          fontSize: ".875rem",
          color: "rgba(255, 255, 255, .5)",
          mb: [null, "0"],
        },
      },
    },
    ".right": {
      width: "100%",
      maxWidth: ["300px", "none"],
      ".info-card": {
        width: [null, "100%"],
        mb: [null, "2rem"],
        ">div": {
          justifyContent: "space-between",
          alignItems: "center",
          mb: "1rem",
        },
        ">ul.links": {
          mb: ["3rem", "1.5rem"],
          "*": {
            color: "rgba(255, 255, 255, 0.5)",
            textDecoration: "none",
          },
          li: {
            display: "flex",
            fontFamily: "Nunito Sans",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: ".875rem",
            lineHeight: "120%",
            mb: "11px",
            color: "rgba(255, 255, 255, 0.5)",
            img: { maxWidth: "1rem", mr: ".5rem" },
          },
        },
        ">button": {
          backgroundColor: "white",
          color: "black",
          ml: "auto",
          width: "100%",
          p: [null, "1.25rem"],
          borderRadius: [null, "100px"],
        },
      },
    },
  },
};

export default styles;
