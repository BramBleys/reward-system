import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatGridListModule } from '@angular/material';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RoutingModule } from './routing/routing.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LeaderboardComponent, MainContentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    RoutingModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
