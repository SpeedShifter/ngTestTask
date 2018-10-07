import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigureAppComponent } from './configure-app/configure-app.component';

/* UI */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserDetailsComponent } from './user-details/user-details.component';

/* State Management */
import { NgxsModule } from '@ngxs/store';
import { TheState } from './state/the.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

@NgModule({
  declarations: [
    AppComponent,
    ConfigureAppComponent,
    ListUsersComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      TheState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
