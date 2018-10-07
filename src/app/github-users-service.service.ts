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

export type User = {
  // id: number;
  name: string;
  email: string;
  // author: string;
  // description: string;
  // topic: string;
  // url: string;
};

export type Result = {
  userCount: number;
  nodes: User[];
  pageInfo: PageInfo;
};
export type Query = {
  search: Result;
};
export type PageInfo = {
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
    private httpLink: HttpLink) { }

  /**
   * Loads the users from git hub. It set the global loading state and updates
   * the progress as it loads users in chunks of 100.
   */
  public loadUsers(gitToken: string): Observable<User[]> {

    const obs = new Subject<User[]>();

    const http = this.httpLink.create({ uri: 'https://api.github.com/graphql' });

    const auth = setContext((_, { headers }) => {

      const token = gitToken || ''; // localStorage.getItem('token');

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
      // other options like cache
    });


    this.fetchOneBatch(null, obs);
    return obs;

  }

  /**
   * A quick and dirty way to use the angular graph ql api while chaining multiple api calls that rely on each other.
   */
  private fetchOneBatch(nextPageToken: string = null, obs: Subject<User[]>, acc: User[] = []) {

    if (acc.length >= 1000) {
      obs.next(acc);
    } else {
      this.apollo.query<Query>({
        query: gql`
      query($page: String){
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
            }
          }
        }
      }
      `,
        variables: {
          page: null
        }
      }).subscribe((r) => {
        console.log(r);
        if (r.data.search.pageInfo.hasNextPage) {
          this.fetchOneBatch(r.data.search.pageInfo.endCursor, obs, acc.concat(r.data.search.nodes));
        } else {
          // if there are less than 1000 users, simply return them
          obs.next(acc);
        }
      });
    }
  }
}
