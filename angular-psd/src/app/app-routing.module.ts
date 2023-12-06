import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { GeneralRegisterComponent } from './pages/general-register/general-register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { authGuard } from './services/auth/auth.guard';

import { ProjectSelectComponent } from './pages/project-ui/project-select/project-select.component';
import { SolarSelectComponent } from './pages/project-ui/solar-select/solar-select.component';
import { NoiseSelectComponent } from './pages/project-ui/noise-select/noise-select.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'general-register', component: GeneralRegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  { path: 'user-management', component: UserManagementComponent, canActivate: [authGuard]},
  { path: 'user-create', component: CreateUserComponent, canActivate: [authGuard]},
  { path: 'project', component: ProjectSelectComponent, canActivate: [authGuard]},
  { path: 'solar', component: SolarSelectComponent, canActivate: [authGuard]},
  { path: 'noise', component: NoiseSelectComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
