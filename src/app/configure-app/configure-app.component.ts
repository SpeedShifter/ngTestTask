import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetGitToken, UpdateLoadingProgress } from '../actions/generalState.actions';

@Component({
  selector: 'app-configure-app',
  templateUrl: './configure-app.component.html',
  styleUrls: ['./configure-app.component.css']
})
export class ConfigureAppComponent implements OnInit {

  constructor(private router: Router, private store: Store) { }

  ngOnInit() {
  }

  loadUsers(withToken: string) {

    const setTokenObs = this.store.dispatch(new SetGitToken('test'));

    setTokenObs.subscribe(() => {
      // once we are done, neve

      this.store.dispatch(new UpdateLoadingProgress(99));
      this.router.navigate(['/listUsers']);
    });

  }

}
