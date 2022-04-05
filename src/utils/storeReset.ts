import { Dispatch } from "react";
import { StateAction } from "src/state/action";

export const clearPublishState = (dispatch: Dispatch<StateAction>) => {
  dispatch({ type: "setipfs", payload: "" });
  dispatch({ type: "setipfsSuccess", payload: false });
  dispatch({ type: "setipfsError", payload: null });
  dispatch({ type: "setsubdomain", payload: "" });
  dispatch({ type: "setsubdomainLookupSuccess", payload: false });
  dispatch({ type: "setsubdomainRegisterSuccess", payload: false });
  dispatch({ type: "setsubdomainError", payload: null });
};
