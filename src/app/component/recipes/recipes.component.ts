import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  inBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly httpClient: HttpClient

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
                localStorage.setItem('token', params.token);
                this.router.navigate(['/']);
              });
          } else
            if (params.code) {
              // Google Login
              this.googleSignIn(params.code)
                .subscribe((params: Params) => {
                  console.log('parraGG', params);
                  localStorage.setItem('token', params.token.token);
                  this.router.navigate(['/']);
                });
            }
        }
      });
    }


  }


  // facebookSignIn(code: string): Observable<any> {
  //   return this.httpClient.post('http://localhost:3000/auth/facebook/signin', { code })
  //     .flatMap((token: IToken) => {
  //       localStorage.setItem('token', token.token);
  //       return of(token);
  //     }).pipe();
  // }

  facebookSignIn(code: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/auth/facebook/signin', { code });
  }

  // facebookSignIn(code: string): Observable<any> {
  //   return this.httpClient.post('http://localhost:3000/auth/facebook/signin', { code })
  //     .flatMap((token: IToken) => {
  //       localStorage.setItem('token', token.token);
  //       return of(token);
  //     }).pipe();
  // }


  // public getRecipes(): Promise<any[]> {
  //   return new Promise<any[]>((resolve, reject) => {
  //     resolve(this.recipes);
  //   });
  // }


  googleSignIn(code: string): Observable<any> {
    return this.httpClient.post('http://localhost:3000/auth/google/signin', { code });
  }

  // facebookSignIn(code: string): Observable<any> {
  //   return this.httpClient.post('api/auth/facebook/signin', { code })
  //     .flatMap((token: IToken) => {
  //       localStorage.setItem('token', token.token);
  //       return of(token);
  //     }).pipe();
  // }

}
