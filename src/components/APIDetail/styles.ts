import { Styles } from "../../utils/stylesInterface";

const styles: Styles = {
  wrap: {
    display: "flex",
    minHeight: "600px",
    justifyContent: "space-between",
    flexDirection: ["column-reverse", "column-reverse", "row"],
    gap: "2rem",
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
        ".logo-wrap": {
          display: "flex",
          gridArea: `logo`,
          width: "6.25rem",
          height: "6.25rem",
          borderRadius: "20px",
          overflow: "hidden",
          background: "white",
          "img.api-logo": {
            width: "100%",
            height: "auto",
          },
        },
        "h2.title": {
          gridArea: "title",
          mb: [".75rem", "1.25rem"],
          fontSize: [null, "20px"],
        },
        "div.description-wrap": {
          gridArea: "description",
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
      ".body": {
        height: "100%",
        ">div": {
          width: "100%",
          maxWidth: "50rem",
          h3: { textAlign: "left" },
          pre: { mb: [null, "0"] },
        },
        ".spinner_wrap": {
          height: "100%",
        },
      },
    },
    ".right": {
      width: "100%",
      maxWidth: ["100%", "100%", "221px"],
      flexDirection: ["row", "column", "column"],
      justifyContent: ["space-between", "normal", "normal"],
      ".info-card": {
        flexDirection: "column",
        width: ["100%", "100%", null],
        ">h3": {
          mb: "1rem",
        },
        ">ul.links": {
          mb: ["2.5rem", "1.5rem", "2.5rem"],
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
            a: { overflow: "hidden", textOverflow: "ellipsis" },
          },
        },
      },
      ">button": {
        backgroundColor: "white",
        alignSelf: "flex-start",
        color: "black",
        ml: "auto",
        width: "100%",
        maxWidth: ["221px", "100%", "221px"],
        p: [null, "1.25rem"],
        borderRadius: [null, "100px"],
      },
    },
  },
};

export default styles;
