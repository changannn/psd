import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { NgCircleProgressModule } from "ng-circle-progress";
import { GeneralRegisterComponent } from './pages/general-register/general-register.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ProjectSelectComponent } from './pages/project-ui/project-select/project-select.component';
import { SolarSelectComponent } from './pages/project-ui/solar-select/solar-select.component';
import { NoiseSelectComponent } from './pages/project-ui/noise-select/noise-select.component';

import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageAdminComponent } from './homepage-admin/homepage-admin.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ErrorComponent } from './pages/error/error.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TimeoutComponent } from './pages/timeout/timeout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    GeneralRegisterComponent,
    HeaderComponent,
    UserManagementComponent,
    CreateUserComponent,
    ProjectSelectComponent,
    SolarSelectComponent,
    NoiseSelectComponent,
    HomepageAdminComponent,
    UserHeaderComponent,
    ErrorComponent,
    TimeoutComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    MatCardModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      backgroundColor: "teal",
      backgroundPadding: 8,
      radius: 60,
      space: -15,
      maxPercent: 100,
      unitsColor: "#ffffff",
      outerStrokeWidth: 7.5,
      outerStrokeColor: "white",
      innerStrokeColor: "teal",
      innerStrokeWidth: 3,
      titleColor: "#ffffff",
      subtitleColor: "#ffffff"
    }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
