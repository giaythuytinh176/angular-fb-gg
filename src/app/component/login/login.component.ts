import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  httpJson = {
    headers: new HttpHeaders({
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': true,
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    })
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly httpClient: HttpClient,
  ) { }

  ngOnInit(): void { }

  requestFacebookRedirectUri(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/auth/facebook/uri', this.httpJson);
  }

  requestGoogleRedirectUri(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/auth/google/uri', this.httpJson);
  }

  facebookLogin() {
    this.requestFacebookRedirectUri()
      .subscribe((response: { redirect_uri: string }) => {
        console.log('responseFacebook', response);
        window.location.replace(response.redirect_uri);
      }, (error: any) => {
        console.log('errorFacebook', error);
      });
  }

  googleLogin() {
    this.requestGoogleRedirectUri()
      .subscribe((response: { redirect_uri: string }) => {
        console.log('responseGoogle', response);
        window.location.replace(response.redirect_uri);
      }, (error: any) => {
        console.log('errorGoogle', error);
      });
  }

}
