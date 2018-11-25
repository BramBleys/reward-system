import { ApprovingComponent } from './../approving-admin/approving/approving.component';
import { AdminGuard } from './../_guards/admin.guard';
import { OpdrachtenCrudComponent } from './../opdrachten-crud/opdrachten-crud.component';
import { AuthGuard } from './../_guards/auth.guard';
import { RewardshopComponent } from './../rewardshop/rewardshop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';
import { FormMedewerkerComponent } from '../form-medewerker/form-medewerker.component';
import { OpdrachtenComponent } from '../opdrachten/opdrachten.component';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RewardsCrudComponent } from '../rewards-crud/rewards-crud.component';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { SidebarScoresComponent } from '../sidebar-scores/sidebar-scores.component';
import {WelcomeComponent} from '../welcome/welcome.component';


const routes: Routes = [

  { path: 'addOpdracht', component: FormMedewerkerComponent, canActivate: [AuthGuard] },
  { path: '', component: LeaderboardComponent, outlet: 'sidebar' },
  {path: '', component: WelcomeComponent},
  { path: 'overview', component: LeaderboardComponent, outlet: 'sidebar' },
  {path: 'overview', component: OpdrachtenComponent},
  { path: 'path', component: LeaderboardComponent },
  { path: 'path', component: OpdrachtenComponent, outlet: 'sidebar' },
  { path: 'login', component: LoginComponent },
  { path: 'login', component: LeaderboardComponent, outlet: 'sidebar' },
  { path: 'sendassignement', component: LeaderboardComponent, outlet: 'sidebar' },
  { path: 'sendassignement', component: FormMedewerkerComponent},
  {path: 'rewardshop', component: RewardshopComponent, canActivate:[AuthGuard]},
  {path: 'rewardscrud', component: RewardsCrudComponent, canActivate:[AdminGuard]},
  {path: 'opdrachten', component: OpdrachtenComponent, canActivate: [AuthGuard]},
  {path: 'opdrachtencrud', component: OpdrachtenCrudComponent, canActivate:[AdminGuard]},
  {path: 'approveassignements', component: ApprovingComponent, canActivate:[AdminGuard]}
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard]
})

export class RoutingModule { }
