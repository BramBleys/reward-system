import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { OpdrachtenComponent } from '../opdrachten/opdrachten.component';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: '', component: OpdrachtenComponent },
  { path: '', component: LeaderboardComponent, outlet: 'sidebar' },
  { path: 'path', component: LeaderboardComponent },
  { path: 'path', component: OpdrachtenComponent, outlet: 'sidebar' },
  { path: 'login', component: LoginComponent },
  { path: 'login', component: LeaderboardComponent, outlet: 'sidebar' },


];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
