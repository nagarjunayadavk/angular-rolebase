import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminModule } from './admin/admin.module';
import { DashboardComponent as AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { PermissionDeniedComponent } from './permission-denied/permission-denied.component';
import { AuthGuard } from './auth/auth.guard';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { roles: ['user'] }
  },
  //====== With Out Lazy loading 
  {
    path: 'admin', children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      }
    ],
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'page1',
    component: Page1Component,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] }
  },
  {
    path: 'page2',
    component: Page2Component,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  { path: 'accessdenied', component: PermissionDeniedComponent, pathMatch: 'full' },
  { path: '**', component: NotfoundComponent, pathMatch: 'full' }//=== This component we have to always last. Other wise it walys shows $04 Not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, AdminModule]
})
export class AppRoutingModule { }
