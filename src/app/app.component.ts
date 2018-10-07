import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { TheState } from './state/the.state';
import { Observable } from 'rxjs';
import { GeneralState } from './models/generalState.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngTestTask';

  @Select(TheState.getApp) appState$: Observable<GeneralState>;

  constructor(private store: Store) {

  }
}
