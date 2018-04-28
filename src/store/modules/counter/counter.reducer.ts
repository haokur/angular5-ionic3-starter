
import { CounterActionUnion, CounterTypes } from './counter.action';
import { counterState, initCounterState } from './counter.state';

/**
 * reducer
 */
export function counterReducer(state: counterState = initCounterState, action: CounterActionUnion) {
  switch (action.type) {
    case CounterTypes.INCREMENT:
      return Object.assign(state, {
        num: state.num + 1
      })
    case CounterTypes.DECREMENT:
      return Object.assign(state, {
        num: state.num - 1
      })
    case CounterTypes.RESET:
      return Object.assign(state, {
        num: 0
      })
    default:
      return state;
  }
}
