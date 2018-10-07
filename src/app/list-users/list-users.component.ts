import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { FilteredUser } from '../models/user.model';
import { TheState, TheStateModel } from '../state/the.state';
import { Observable } from 'rxjs';
import { UserList } from 'userList.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SetFilter } from '../actions/userList.actions';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private store: Store, private router: Router) { }

  @Select(TheState.getUsers) users$: Observable<UserList>;

  searchForm = new FormControl('');

  viewUser(id: string) {
    this.router.navigate(['/userDetails/' + id]);
  }

  ngOnInit() {
    // peek into store and navigate to store if no data is present
    const state = this.store.selectSnapshot<TheStateModel>((state: TheStateModel) => state.app);
    if (state.app.isLoading === false && state.userList.users.length === 0) {
      this.router.navigate(['/']);
    }

    this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe((v) => {
      console.log(v);

      this.store.dispatch(new SetFilter(v));
    });
    // this.users$.pipe
  }

}
