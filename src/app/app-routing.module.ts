import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { WebcamComponent } from './components/webcam/webcam.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserTokenGuard } from './guards/userToken/user-token.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path:'webcam',
    component:WebcamComponent,
    canActivate:[UserTokenGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'payment',
    component:PaymentComponent
  },
  { path: 'loginAuth', loadChildren: () => import('./auth-login/auth-login.module').then(m => m.AuthLoginModule) },
  { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  {path: '', redirectTo:'/register' , pathMatch:'full'},
  {path: '**', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
