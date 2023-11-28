import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/base-auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './components/base-auth/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './services/LocalStorageService';
import { TasksComponent } from './components/tasks/tasks.component';
import { CreateTaskComponent } from './components/tasks/create-task/create-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { DeleteTaskComponent } from './components/tasks/delete-task/delete-task.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './/services/jwt.interceptor';
import { NavbarComponent } from './components/tasks/navbar/navbar.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { BaseComponent } from './components/tasks/base/base.component';
import { BaseAuthComponent } from './components/base-auth/base-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    NavbarComponent,
    TaskComponent,
    BaseComponent,
    BaseAuthComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,
    NgbPaginationModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [LocalStorageService,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
