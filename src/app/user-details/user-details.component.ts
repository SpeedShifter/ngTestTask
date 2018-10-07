import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserList } from 'userList.model';
import { TheStateModel } from '../state/the.state';

import * as _ from 'lodash';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) { }

  public id: string;
  public user: User;

  back() {
    this.router.navigate(['/listUsers']);
  }

  ngOnInit() {
    // peek into store and navigate to store if no data is present
    const userList = this.store.selectSnapshot<UserList>((state: TheStateModel) => state.app.userList);
    if (!userList || userList.users.length===0) {
      this.router.navigate(['/']);
    }

    this.id = this.route.snapshot.paramMap.get('id');

    this.user =  _.find(userList.users, (u) => u.id === this.id);
  }

}
