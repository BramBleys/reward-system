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
import { RewardsCrudComponent } from './rewards-crud/rewards-crud.component';
import { FormsModule } from '@angular/forms';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './translate.pipe';
import {FilterPipe} from './pipes/filterPipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeaderboardComponent,
    MainContentComponent,
<<<<<<< HEAD
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
=======
    SidebarScoresComponent,
    SidebarAdminComponent,
    OpdrachtenComponent,
    RewardsCrudComponent,
    TranslatePipe,
    FilterPipe
  ],
  imports: [BrowserModule, RoutingModule, HttpClientModule, NgbModule.forRoot(), OpdrachtenModule, FormsModule],
  providers: [TranslateService],
>>>>>>> 0e8d8f595c663047f8fc54ad6e2a6b04f7a2c1a8
  bootstrap: [AppComponent]
})
export class AppModule { }
