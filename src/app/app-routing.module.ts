import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigureAppComponent } from './configure-app/configure-app.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', component: ConfigureAppComponent },
  { path: 'listUsers', component: ListUsersComponent },
  { path: 'userDetails/:id', component: UserDetailsComponent}
  // { path: '',
  //   redirectTo: '/config',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
