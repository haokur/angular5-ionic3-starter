import { userState, initUserState } from "./user.state";
import { CounterActionUnion } from "../counter/counter.action";
import { UserStoreTypes, UserActionUnion } from "./user.action";

export function userReducer(state: userState = initUserState, { type, payload }: UserActionUnion) {
  switch (type) {
    case UserStoreTypes.UPDATE_INFO:
      return Object.assign(state, {
        name: payload.name,
        age: payload.age
      })
    default:
      return state;
  }
}