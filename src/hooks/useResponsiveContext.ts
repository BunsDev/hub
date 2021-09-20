import { useContext } from "react";
import ResponsiveContext from "../context/ResponsiveContext";

const useResponsiveContext = () => useContext(ResponsiveContext); // eslint-disable-line

export default useResponsiveContext;
