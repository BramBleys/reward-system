import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RoutingModule } from './routing/routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarScoresComponent } from './sidebar-scores/sidebar-scores.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { OpdrachtenComponent } from './opdrachten/opdrachten.component';

import { OpdrachtenModule } from './opdrachten/opdrachten.module';
import { OpdrachtenComponent } from './opdrachten/opdrachten.component';
import { RewardsCrudComponent } from './rewards-crud/rewards-crud.component';
import { FormsModule } from '@angular/forms';

declarations: [AppComponent, HeaderComponent, LeaderboardComponent, MainContentComponent, SidebarScoresComponent, SidebarAdminComponent, OpdrachtenComponent, RewardsCrudComponent],
imports: [BrowserModule, RoutingModule, HttpClientModule, NgbModule.forRoot(), OpdrachtenModule, FormsModule],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule {}
