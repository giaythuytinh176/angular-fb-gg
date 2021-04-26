import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  token = window.localStorage.getItem('token');
  data: any;
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): any {
    this.http.get<any[]>('https://backend-tamle.ap.ngrok.io/user', this.httpJson)
      .subscribe((data: any) => {
        this.data = data;
        console.log('data', data);
      }, error => {
        console.log(error);
      });
  }

}
