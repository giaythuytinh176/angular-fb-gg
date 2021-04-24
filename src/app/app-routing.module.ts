import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RecipesComponent } from './component/recipes/recipes.component';
import { AllUsersComponent } from './component/user/all-users/all-users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'recipes',
    component: RecipesComponent,
  },
  {
    path: 'getAllUsers',
    component: AllUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
