// interface
export interface ICounter {
  num: number;
}

// state
export interface counterState {
  num: number;
}

export const initCounterState: counterState = {
  num: 0
}