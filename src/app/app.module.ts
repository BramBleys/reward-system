import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RoutingModule } from './routing/routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarScoresComponent } from './sidebar-scores/sidebar-scores.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';

import { OpdrachtenModule } from './opdrachten/opdrachten.module';
import { OpdrachtenComponent } from './opdrachten/opdrachten.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeaderboardComponent,
    MainContentComponent,
    LoginComponent,
    SidebarScoresComponent,
    SidebarAdminComponent,
    OpdrachtenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule,
    NgbModule.forRoot(),
    OpdrachtenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
