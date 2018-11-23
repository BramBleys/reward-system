import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { FormMedewerkerComponent } from '../form-medewerker/form-medewerker.component';
import { OpdrachtenComponent } from '../opdrachten/opdrachten.component';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RewardsCrudComponent } from '../rewards-crud/rewards-crud.component';
import {SidebarAdminComponent} from '../sidebar-admin/sidebar-admin.component';
import {SidebarScoresComponent} from '../sidebar-scores/sidebar-scores.component';
import { OpdrachtenCrudComponent } from '../opdrachten-crud/opdrachten-crud.component';


const routes: Routes = [
  { path: '', component: OpdrachtenCrudComponent },
  { path: '', component: LeaderboardComponent, outlet: 'sidebar' },
  { path: 'path', component: LeaderboardComponent },
  { path: 'path', component: OpdrachtenComponent, outlet: 'sidebar' },
  { path: 'login', component: LoginComponent },
  { path: 'login', component: LeaderboardComponent, outlet: 'sidebar' },
  { path: 'sendassignement', component: LeaderboardComponent, outlet: 'sidebar' },
  { path: 'sendassignement', component: FormMedewerkerComponent}
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
