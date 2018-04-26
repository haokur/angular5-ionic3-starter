
// types + actions

/**
 * types
 */
export enum CounterTypes {
  INCREMENT = '[Counter] INCREMENT',
  DECREMENT = '[Counter] DECREMENT',
  RESET = '[Counter] RESET',
}

/**
 * actions
 */
import { Action } from '@ngrx/store';

// 增加1 或者 多
export class IncrementCounter implements Action {
  readonly type = CounterTypes.INCREMENT

  constructor(public payload: string) { }
}

// 减少1 或者 多
export class DecrementCounter implements Action {
  readonly type = CounterTypes.DECREMENT

  constructor(public payload: string) { }
}

// 重置 
export class ResetCounter implements Action {
  readonly type = CounterTypes.RESET

  constructor(public payload: string) { }
}

export type CounterActionUnion =
  | IncrementCounter
  | DecrementCounter
  | ResetCounter