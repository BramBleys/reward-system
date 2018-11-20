import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { OpdrachtenComponent } from '../opdrachten/opdrachten.component';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
{ path: '', component: OpdrachtenComponent},
{ path: '', component: LeaderboardComponent, outlet: 'sidebar' },
{ path: 'path', component: LeaderboardComponent},
{ path: 'path', component: OpdrachtenComponent, outlet: 'sidebar'}


];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {}
