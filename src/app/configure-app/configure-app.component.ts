import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetGitToken, UpdateLoadingProgress } from '../actions/generalState.actions';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-configure-app',
  templateUrl: './configure-app.component.html',
  styleUrls: ['./configure-app.component.css']
})
export class ConfigureAppComponent implements OnInit {

  constructor(private router: Router, private store: Store) { }
  gitTokenForm = new FormControl('', [Validators.required, Validators.pattern('[a-z]*')]);

  getErrorMessage() {
    return this.gitTokenForm.hasError('required') ? 'You must enter a value' :
        this.gitTokenForm.hasError('pattern') ? 'Not a valid token' :
            '';
  }

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
