import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { GeneralRegisterComponent } from './pages/general-register/general-register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { authGuard } from './services/auth/auth.guard';

import { IemsimComponent } from './pages/iemsim/iemsim.component';

import { HomepageAdminComponent } from './homepage-admin/homepage-admin.component';
import { ErrorComponent } from './pages/error/error.component';
import {EmailActionComponent} from "./email-action/email-action.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'general-register', component: GeneralRegisterComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'user-management', component: UserManagementComponent},
  { path: 'user-create', component: CreateUserComponent},
  { path: 'iemsim', component: IemsimComponent},
  { path: 'homepage-admin', component: HomepageAdminComponent },
  { path: 'email-verification', component: EmailActionComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
