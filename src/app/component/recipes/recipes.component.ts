import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  inBrowser: boolean;
  showData: boolean = false;
  data: any;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly httpClient: HttpClient,
    public toasrt: ToastrService,
  ) { }

  ngOnInit() {
    this.inBrowser = isPlatformBrowser(this.platformId);

    if (this.inBrowser) {
      this.route.queryParams.subscribe((params: Params) => {
        if (Object.keys(params).length) {
          // Facebook Login
          if (params.code && params.state) {
            this.facebookSignIn(params.code)
              .subscribe((params: Params) => {
                console.log('parraFB', params);
                localStorage.setItem('token', params.token.token);
                localStorage.setItem('method', 'facebook');
                this.router.navigate(['/']);
                this.toasrt.success(`Login Account Facebook ${params.body.email} successfully.`);
                this.showData = true;
                this.data = (params.body);
              });
          } else
            if (params.code) {
              // Google Login
              this.googleSignIn(params.code)
                .subscribe((params: Params) => {
                  console.log('parraGG', params);
                  localStorage.setItem('token', params.token.token);
                  localStorage.setItem('method', 'google');
                  this.router.navigate(['/']);
                  this.toasrt.success(`Login Account Google ${JSON.parse(params.body).email} successfully.`);
                  this.showData = true;
                  this.data = JSON.parse(params.body);
                });
            }
        }
      });
    }
  }

  facebookSignIn(code: string): Observable<any> {
    return this.httpClient.post('https://backend-tamle.ap.ngrok.io/auth/facebook/signin', { code });
  }

  googleSignIn(code: string): Observable<any> {
    return this.httpClient.post('https://backend-tamle.ap.ngrok.io/auth/google/signin', { code });
  }


}
