
// types + actions

/**
 * types
 */
export enum UserStoreTypes {
  UPDATE_INFO = '[Counter] UPDATE_INFO',
}

/**
 * actions
 */
import { Action } from '@ngrx/store';
import { userState } from './user.state';

// 更新用户信息
export class UpdateUserInfo implements Action {
  readonly type = UserStoreTypes.UPDATE_INFO

  constructor(public payload: userState) { }
}

export type UserActionUnion =
  | UpdateUserInfo

