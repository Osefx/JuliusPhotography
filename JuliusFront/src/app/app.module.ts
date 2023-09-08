import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './component/user/user.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { EmptyLayoutComponent } from './component/empty-layout/empty-layout.component';
import { ContactComponent } from './component/contact/contact.component';
import { PortfolioPageComponent } from './component/portfolio-page/portfolio-page.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    PortfolioComponent,
    EmptyLayoutComponent,
    ContactComponent,
    PortfolioPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
