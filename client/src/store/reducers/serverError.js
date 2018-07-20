import { fromJS } from "immutable";
import { SERVER_ERROR } from "../actions/types";

const initialState = fromJS({
  error: false
});

export default (state = initialState, { type }) => {
  switch (type) {
    case SERVER_ERROR:
      return state.set("error", true);
    default:
      return state;
  }
};
