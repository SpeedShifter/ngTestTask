import { GeneralState } from '../models/generalState.model';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetGitToken, UpdateLoadingProgress } from '../actions/generalState.actions';

export class TheStateModel {
  app: GeneralState;
}

/**
 * The state of the whole application capturing global app state and the loaded user data.
 */
@State<TheStateModel>({
  name: 'app',
  defaults: {
    app: {
      isLoading: false,
      gitToken: null,
      errorMessage: null,
      isError: false,
      loadProgress: -1
    }
  }
})
export class TheState {
  @Selector()
  static getApp(state: TheStateModel) {
    return state.app;
  }

  @Action(SetGitToken)
  setGitToken( {getState, patchState}: StateContext<TheStateModel>, { payload }: SetGitToken ) {
    const state = getState();

    patchState({
      ...state,
      app: {
         ...state.app,
         gitToken: payload
      }
    });
  }

  @Action(UpdateLoadingProgress)
  updateLoadingProgress( {getState, patchState}: StateContext<TheStateModel>, { payload }: UpdateLoadingProgress ) {
    const state = getState();

    patchState({
      ...state,
      app: {
         ...state.app,
         isLoading: payload >= 0 && payload < 100,
         loadProgress: payload
      }
    });
  }
}
