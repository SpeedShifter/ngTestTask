/**
 * Once the token is set, the app will start loading data and switch to presenting the data.
 */
export class SetGitToken {
  static readonly type = '[Global State] Set git token';

  /**
   * @param payload The git api token to use.
   */
  constructor(public payload: string) {}
}

/**
 * Once the error state is set, we cannot clear it unless we "restart" the app.
 */
export class SetErrorState {
  static readonly type = '[Global State] Set error flag';

  /**
   * @param payload The error string.
   */
  constructor(public payload: string) {}
}

/**
 * If loading progress is >=100 (or <0), the loading is considered to be done.
 * If loading progress is >=0, the loading process is considered to have started.
 *
 * @remarks Typically I would not make the start and stop more explicit.
 */
export class UpdateLoadingProgress {
  static readonly type = '[Global State] Set loading progress';

  /**
   * @param payload The current loading progress.
   */
  constructor(public payload: number) {}
}

