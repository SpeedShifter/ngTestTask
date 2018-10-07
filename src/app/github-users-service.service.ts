import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { setContext } from 'apollo-link-context';
import { HttpLink, } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from './models/user.model';
import { Store } from '@ngxs/store';
import { UpdateLoadingProgress } from './actions/generalState.actions';
import { SetUsers } from './actions/userList.actions';
import { TheStateModel } from './state/the.state';

/* Some temp types for the query */
type Result = {
  userCount: number;
  nodes: User[];
  pageInfo: PageInfo;
};
type Query = {
  search: Result;
};

type PageInfo = {
  endCursor: string;
  hasNextPage: string;
};


/**
 * @remark This class is misnamed due to wrong usage of the ng cli, but I didn't want to refactor it.
 */
@Injectable({
  providedIn: 'root'
})
export class GithubUsersServiceService {

  constructor(private apollo: Apollo,
    private httpLink: HttpLink,
    private store: Store
    ) { }

  /**
   * Loads the users from git hub. It set the global loading state and updates
   * the progress as it loads users in chunks of 100.
   */
  public loadUsers() {

    this.store.dispatch(new UpdateLoadingProgress(0));

    const token = this.store.selectSnapshot<string>((state: TheStateModel) => state.app.app.gitToken);

    const http = this.httpLink.create({ uri: 'https://api.github.com/graphql' });

    const auth = setContext((_, { headers }) => {

      if (!token) {
        return {};
      } else {
        return {
          headers: (headers || new HttpHeaders()).append('Authorization', `Bearer ${token}`)
        };
      }
    });

    this.apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache()
    });


    this.fetchUsers(null);

  }

  private finishFetch(users: User[]) {
    this.store.dispatch(new UpdateLoadingProgress(100));
    this.store.dispatch(new SetUsers(users));
  }
  /**
   * A quick and dirty way to use the angular graph ql api while chaining multiple api calls that rely on each other.
   */
  private fetchUsers(nextPageToken: string = null, acc: User[] = []) {

    if (acc.length >= 1000) {
      this.finishFetch(acc);
    } else {
      this.apollo.query<Query>({
        query: gql`
          query($page: String)
          {
            search(query: "created:<2018-01-01", first: 100, after:$page, type: USER) {
              userCount
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                ... on User {
                  name
                  email
                  id
                }
              }
            }
          }
      `,
        variables: {
          page: null
        }
      }).subscribe((r) => {

        if (r.data.search.pageInfo.hasNextPage) {
          this.store.dispatch(new UpdateLoadingProgress( acc.length / 10));
          this.fetchUsers(r.data.search.pageInfo.endCursor, acc.concat(r.data.search.nodes));
        } else {
          // if there are less than 1000 users, simply return them
         this.finishFetch(acc);
        }
      });

    }
  }
}
