import {

} from "./types";

const initialState = {
  models: [],
  allModels: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    default:
      return { ...state };
  }
};

export default rootReducer;
