import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { TheState } from './state/the.state';
import { GeneralState } from './models/generalState.model';
import { GithubUsersServiceService } from './github-users-service.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngTestTask';
 result = null;
  @Select(TheState.getApp) appState$: Observable<GeneralState>;

  constructor(private store: Store, private serv: GithubUsersServiceService ) {
    console.log("ewtse4t")
     this.result = serv.loadUsers();
  }
}
