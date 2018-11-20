import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { FormMedewerkerComponent } from '../form-medewerker/form-medewerker.component';

const routes: Routes = [{ path: '', component: LeaderboardComponent, outlet: 'sidebar' },
{ path: '', component: FormMedewerkerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {}
