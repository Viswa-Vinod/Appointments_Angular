import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Routes, Router, RouterModule} from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LandingComponent } from './core/landing/landing.component';
import { HeaderComponent } from './core/header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {CalendarComponent} from "ap-angular2-fullcalendar/src/calendar/calendar";
import { ApptComponent } from './user/appt/appt.component';
import { NewApptComponent } from './user/appt/new-appt/new-appt.component';

import { ApptService } from './service/appt.service';
import { DataService } from './service/data.service';
import { AuthService } from './service/auth.service';
import { EtaService } from './service/eta.service';
import { AuthGuard } from './service/auth-guard.service';

import { DropdownDirective } from './shared/dropdown.directive';
import {DirectionsMapDirective} from './shared/directions.directive';


const appRoutes: Routes = [
  {path: "", component: LandingComponent},
  {path:"user", component: PageNotFoundComponent},
  {path:"user/:id", component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'user/:id/new',component: NewApptComponent, canActivate: [AuthGuard]},
  {path: 'user/:id/:apptID', component: ApptComponent, canActivate: [AuthGuard]},
  {path:"signup", component: SignupComponent},  
  {path:"signin", component: SigninComponent},
  {path: 'not-found',component: PageNotFoundComponent},
  {path: '**',redirectTo: '/not-found' } 
  // {path:"dashboard", component: }

]
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    DropdownDirective,
    SignupComponent,
    DashboardComponent,
    SigninComponent,
    PageNotFoundComponent,
    CalendarComponent,
    ApptComponent,
    NewApptComponent,
    DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({apiKey: "AIzaSyDpDH1L1XkSf78Kj9GHBqY7kaOFDnd_X3c"})
  ],
  providers: [AuthService, DataService, ApptService, EtaService, GoogleMapsAPIWrapper, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
