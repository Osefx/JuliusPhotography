import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { EmptyLayoutComponent } from './component/empty-layout/empty-layout.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'home', component: EmptyLayoutComponent},
  { path: '', component: EmptyLayoutComponent},
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
