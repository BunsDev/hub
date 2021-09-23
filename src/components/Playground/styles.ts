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
        ".input-wrap": {
          width: "340px",
          maxWidth: "100%",
          bg: "black",
          ".btn-suffix": {
            width: "65px",
            alignSelf: "stretch",
            borderRadius: "6px",
            border: "none",
            margin: "2px",
            justifyContent: "center",
            fontSize: "14px",
            lineHeight: "120%",
            fontWeight: "normal",
          },
        },
      },
    },
    ".subheader": {
      justifyContent: "space-between",
      flexWrap: "wrap",
      mb: "1.25rem",
      ">div": {
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        h3: { mr: [null, ".5rem"], width: [null, "100%"] },
        ".labels": { mb: [null, "1.25rem"], gap: "1rem" },
      },
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
    ".grid": {
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
        flexDirection: "column",
        gap: "1rem",
        section: { height: "50%" },
        overflow: "hidden",
        "section.templates": { p: "20px" },
        "section.vars": {
          ">div.subtitle-1": {
            p: "12px 16px",
            borderBottom: "1px solid rgba(255, 255, 255, .2)",
          },
        },
      },
      ".result": {
        overflow: "hidden",
        ">section": {
          height: "100%",
          ".controls": {
            justifyContent: "space-between",
            p: "1.25rem 1.5rem .75rem 1rem",
            ">div": { gap: "1rem" },
            span: {
              cursor: "pointer",
              alignSelf: "flex-start",
              lineHeight: "100%",
            },
          },
          pre: {
            height: "100%",
            backgroundColor: "black",
            pb: 0,
            mb: 0,
            ">div": { display: "grid", placeItems: "center", height: "60%" },
          },
        },
      },
      ".schema": {
        position: "relative",
        bg: "black",
        minWidth: "0 !important",
        maxWidth: "339px !important",
        transition: ".2s all ease",
        overflowY: "scroll",
        height: [null, "270px"],
        section: {
          position: "absolute",
          top: 0,
          right: [null, 0],
          width: "100%",
          "div.subtitle-1": {
            position: "sticky",
            top: "0",
            bg: "black",
            zIndex: "10",
            justifyContent: "space-between",
            p: "1.25rem 1.5rem .75rem 1rem",
            borderBottom: "1px solid rgba(255, 255, 255, .2)",
            "span.btn": { cursor: "pointer" },
          },
        },
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
