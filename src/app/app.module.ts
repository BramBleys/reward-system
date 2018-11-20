import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RoutingModule } from './routing/routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OpdrachtenModule } from './opdrachten/opdrachten.module';
import { OpdrachtenComponent } from './opdrachten/opdrachten.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LeaderboardComponent, MainContentComponent, OpdrachtenComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    NgbModule.forRoot(),
    OpdrachtenModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
