
import { CounterTypes } from './counter.type'
import { CounterActionUnion } from './counter.action';
import { initCounterState, counterState } from './counter.state';

/**
 * reducer
 */
export function counterReducer(state: counterState = initCounterState, action: CounterActionUnion) {
  switch (action.type) {
    case CounterTypes.INCREMENT:
      console.log(state)
      return Object.assign({}, state, {
        num: state.num + 1
      })
    case CounterTypes.DECREMENT:
      return Object.assign({}, state, {
        num: state.num - 1
      })
    case CounterTypes.DECREMENT:
      return Object.assign({}, state, {
        num: 0
      })
    default:
      return state;
  }
}
