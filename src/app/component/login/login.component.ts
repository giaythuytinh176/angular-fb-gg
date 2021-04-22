import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  httpJson = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    })
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly httpClient: HttpClient,

  ) { }

  ngOnInit(): void { }

  goToLoginUrlFacebook() {
    this.document.location.href = 'http://localhost:3000/auth/facebook';
  }

  goToLoginUrlGoogle() {
    this.document.location.href = 'http://localhost:3000/auth/google', this.httpJson;
  }


  requestFacebookRedirectUri(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/auth/facebook', this.httpJson);
  }


  facebookLogin() {
    this.requestFacebookRedirectUri()
      .subscribe((response: {redirect_uri: string}) => {
        window.location.replace(response.redirect_uri);
      });
  }


}

export interface IToken {
  readonly token: string;
}
