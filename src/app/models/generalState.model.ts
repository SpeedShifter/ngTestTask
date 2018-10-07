
/**
 * Describes the general application state that all components should adhere to.
 */
export interface GeneralState {
  /**
   * The git api token used to query the list of users.
   */
  gitToken: string;

  /**
   * A general high level flag that indicates we are loading main data. This is expected to block
   * most user interactions.
   */
  isLoading: boolean;

  /**
   * A progress indicator [0,100] for the current loading operation. This is expected to be 0 once loading starts
   * and 100 on finish.
   */
  loadProgress: number;

  /**
   * Indicates that a global error occured. These kinds of errors require a complete "restart" of the application.
   */
  isError: boolean;

  /**
   * A user facing error message that describes the current error.
   */
  errorMessage: string;

}
