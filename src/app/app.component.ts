import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from './component/login/login.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-fb-gg';

  constructor(
    public login: LoginComponent,
    public toasrt: ToastrService,
    private readonly router: Router,
  ) {

  }

  apiDocument(): void {
    window.location.replace(`${environment.apiUrl}/api`);
  }

  signOut(): void {
    window.localStorage.removeItem('method');
    window.localStorage.removeItem('token');
    setTimeout(() => {
      window.location.reload();
    }, 1111);
    this.router.navigate(['/']);
    this.toasrt.success('Logout successfully.');
  }

}
