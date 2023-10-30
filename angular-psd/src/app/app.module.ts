import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { NgCircleProgressModule } from "ng-circle-progress";
import { GeneralRegisterComponent } from './general-register/general-register.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    GeneralRegisterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
