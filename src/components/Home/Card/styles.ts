import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  card: {
    minWidth: "300px",
    borderRadius: "1.25rem",
    bg: "cardBg",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    height: "13.4375rem",
    transition: "transform .2s ease",
    ">a": {
      textDecoration: "none",
      p: "2rem",
      pb: "1.5rem",
      width: "100%",
      height: "100%",
      ".wrap-contents": {
        ">div": {
          display: "flex",
          gap: "1.5rem",
          ">img": {
            width: "4.25rem",
            height: "4.25rem",
            borderRadius: "20px",
          },
        },
        ".info": {
          ">div.row": {
            justifyContent: "space-between",
            h3: {
              my: 2,
              fontWeight: "bold",
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              letterSpacing: "-0.01em",
              color: "white",
            },
            ".subtitle": {
              my: 2,
              fontFamily: "Nunito Sans",
              fontSize: "0.875rem",
              lineHeight: "1.125rem",
              color: "text",
              mixBlendMode: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          },
        },
      },
    },
  },
};

export default styles;
