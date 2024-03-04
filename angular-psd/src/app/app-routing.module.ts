import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { GeneralRegisterComponent } from './pages/general-register/general-register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

import { IemsimComponent } from './pages/iemsim/iemsim.component';

import { HomepageAdminComponent } from './homepage-admin/homepage-admin.component';
import { ErrorComponent } from './pages/error/error.component';
import {EmailActionComponent} from "./email-action/email-action.component";
import { HomepageUserComponent } from './homepage-user/homepage-user.component';
import { rootGuard } from './services/guards/root.guard';
import { userGuard } from './services/guards/user.guard'
import { loggedinGuard } from './services/guards/loggedin.guard';
import { EditUserComponent } from './pages/edit-user/edit-user.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [loggedinGuard] },
  { path: 'general-register', component: GeneralRegisterComponent, canActivate: [loggedinGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [rootGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [rootGuard] },
  { path: 'user-create', component: CreateUserComponent, canActivate: [rootGuard] },
  { path: 'user-edit/:id', component: EditUserComponent, canActivate: [rootGuard] },
  { path: 'iemsim-admin', component: IemsimComponent, canActivate: [rootGuard] },
  { path: 'iemsim-user', component: IemsimComponent, canActivate: [userGuard] },
  { path: 'homepage-admin', component: HomepageAdminComponent, canActivate: [rootGuard] },
  { path: 'homepage-user', component: HomepageUserComponent, canActivate: [userGuard] },
  { path: 'email-verification', component: EmailActionComponent },
  { path: '**', component: ErrorComponent },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
