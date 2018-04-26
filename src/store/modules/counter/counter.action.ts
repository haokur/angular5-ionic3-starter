
/**
 * action
 */
import { Action } from '@ngrx/store';
import { CounterTypes } from './counter.type';

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