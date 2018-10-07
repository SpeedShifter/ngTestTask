import { GeneralState } from '../models/generalState.model';

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetGitToken, UpdateLoadingProgress } from '../actions/generalState.actions';
import { GithubUsersServiceService } from '../github-users-service.service';
import { UserList } from 'userList.model';
import { SetUsers, SetFilter } from '../actions/userList.actions';

import * as _ from 'lodash';

export class TheStateModel {
  app: GeneralState;
  userList: UserList;
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
    },
    userList: {
      filter: null,
      users: [],
      filteredUsers: []
    }
  }
})
export class TheState {

  constructor(private users: GithubUsersServiceService ) {}

  @Selector()
  static getApp(state: TheStateModel) {
    return state.app;
  }

  @Selector()
  static getUsers(state: TheStateModel) {
    return state.userList.users;
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

  @Action(SetUsers)
  setUsers( {getState, patchState}: StateContext<TheStateModel>, { payload }: SetUsers ) {
    const state = getState();

    patchState({
      ...state,
      userList: {
         ...state.userList,
         users: payload
      }
    });
  }

  @Action(SetFilter)
  ApplyFilter( {getState, patchState}: StateContext<TheStateModel>, { payload }: SetFilter ) {
    const state = getState();

    // apply filter

    patchState({
      ...state,
      userList: {
         ...state.userList,
         filter: payload,
        filteredUsers: _.take(state.userList, 10)
      }
    });
  }
}
