import { counterReducer } from "./counter";
import { testReducer } from "./test";

// reducer集合
export const Reducers = {
  count: counterReducer,
  test: testReducer,
};
