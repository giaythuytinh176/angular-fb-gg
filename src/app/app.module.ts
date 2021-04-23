import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RecipesComponent } from './component/recipes/recipes.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, LoginComponent, RecipesComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        preventDuplicates: true,
      }
    ),],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
