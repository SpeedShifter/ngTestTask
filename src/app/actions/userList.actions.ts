import { User } from "../models/user.model";

/**
 * Once the token is set, the app will start loading data and switch to presenting the data.
 */
export class SetUsers {
  static readonly type = '[User List] Set users';

  /**
   * @param payload The list of users that should be kept;
   */
  constructor(public payload: User[]) {}
}

/**
 * Sets the current filter for the user list and updates the filteredUsers list.
 */
export class SetFilter {
  static readonly type = '[User List] Set filter';

  /**
   * @param payload The filter that will be supplied to the list.
   */
  constructor(public payload: string) {}
}
