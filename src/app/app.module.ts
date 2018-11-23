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
import { FormMedewerkerComponent } from './form-medewerker/form-medewerker.component';
import { SidebarScoresComponent } from './sidebar-scores/sidebar-scores.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';

import { OpdrachtenModule } from './opdrachten/opdrachten.module';
import { OpdrachtenComponent } from './opdrachten/opdrachten.component';
import { RewardsCrudComponent } from './rewards-crud/rewards-crud.component';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './translate.pipe';
import { FilterPipe } from './pipes/filterPipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeaderboardComponent,
    MainContentComponent,
    LoginComponent,
    SidebarScoresComponent,
    SidebarAdminComponent,
    OpdrachtenComponent,
    RewardsCrudComponent,
    TranslatePipe,
    FormMedewerkerComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule,
    NgbModule.forRoot(),
    OpdrachtenModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
