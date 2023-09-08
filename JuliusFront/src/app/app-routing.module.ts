import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { EmptyLayoutComponent } from './component/empty-layout/empty-layout.component';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { PortfolioPageComponent } from './component/portfolio-page/portfolio-page.component';
import { ContactComponent } from './component/contact/contact.component';

const routes: Routes = [
  { path: 'home', component: EmptyLayoutComponent},
  { path: '', component: EmptyLayoutComponent},
  { path: 'user', component: UserComponent },
  { path: 'portfolio', component: PortfolioPageComponent},
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
