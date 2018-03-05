import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Subject, Observable} from "rxjs";
import {Response} from "@angular/http";
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';

import {environment } from "../../environments/environment";
import { HttpResponse } from 'selenium-webdriver/http';
@Injectable()
export class AuthService {

  userLoggedIn: boolean;
  currentUser: any;

  constructor(public http:HttpClient) {
    if (localStorage.getItem('current-user-headers') != null) {
      // this.currentUser = localStorage.getItem('current-user');
      // this.validateToken().subscribe(
      //   res => {
      //   if (res.status == 200) {
          this.userLoggedIn = true;
        }
      else {
        this.userLoggedIn = false;
      }
      // }
  }

  validateToken() {
    if (localStorage.getItem('current-user-headers') && (localStorage.getItem('current-user-data'))) {
    let saved = JSON.parse(localStorage.getItem('current-user-headers'));
    let user = JSON.parse(localStorage.getItem('current-user-data'));
    console.log("User Obj", user);
    let headers = new HttpHeaders();
    headers = headers.append("access-token", saved['access-token']);

    headers = headers.append("client", saved['client']);

    headers = headers.append("expiry", saved['expiry']);
    headers = headers.append("token-type", saved['token-type']);
    headers = headers.append("uid", saved['uid']);

    console.log("headers obj validate", headers);
    return this.http
    .get('http://localhost:3000/auth/validate_token' ,{ headers: headers, observe : "response"})
    .map(res => res);
    }
  }

  userSignedIn() {
    // this.validateToken().subscribe(
    //   res => console.log("checking if user signed in ", res)
    // );
    this.userLoggedIn = localStorage.getItem('current-user-headers') != null && 
    localStorage.getItem('current-user-data') != null;
    return this.userLoggedIn;
  }

  registerUser(signUpData:  {email:string, password:string, passwordConfirmation:string}){
    let headers = new HttpHeaders();
    headers = headers.append('content-type', "application/json");
    return this.http.post('http://localhost:3000/auth/sign_up',signUpData)
      .map(res => res);
  }

  logoutUser() {
    let saved = JSON.parse(localStorage.getItem('current-user-headers'));
    let headers = new HttpHeaders();
    headers = headers.append("access-token", saved['access-token']);

    headers = headers.append("client", saved['client']);

    headers = headers.append("expiry", saved['expiry']);
    headers = headers.append("token-type", saved['token-type']);
    headers = headers.append("uid", saved['uid']);
    return this.http.delete('http://localhost:3000/auth/sign_out', {headers : headers}).map(
      
      res => {
        console.log("delete result", res)
        this.userLoggedIn = false;
        localStorage.clear();
      }
    );
    // this.userLoggedIn = false;

  }
  logInUser(signInData: {email:string, password:string}){
        let headers = new HttpHeaders();
        headers = headers.append('content-type', "application/json");
        // headers = headers.append('observe', "response");

        // headers = headers.append('responseType', "text");
        // headers = headers.append('Access-Control-Allow-Credentials', "true");

        return this.http.post<user>('http://localhost:3000/auth/sign_in', signInData, {headers : headers, observe: "response"})
          .map(
  
            res => {
              // console.log(res.);
              let keys = res.headers.keys();
              let set = res.headers.set;

              console.log("keys",keys);
              console.log("set", set);
              let headers = res.headers['headers'];
              let headerObj = {};
              for (var key in keys) {
                 console.log("key" + keys[key] + "value: " + res.headers.getAll(keys[key]));
                 headerObj[keys[key]] =  res.headers.getAll(keys[key]);
              }
              console.log("headers obj",headerObj);
              let tokenHeaders = {};
              tokenHeaders["access-token"] = headerObj["access-token"];
              tokenHeaders["client"] = headerObj["client"];
              tokenHeaders["expiry"] = headerObj["expiry"];
              tokenHeaders["token-type"] = headerObj["token-type"];
              tokenHeaders["uid"] = headerObj["uid"];
              console.log("token headers obj",headerObj);
              this.userLoggedIn = true;
              localStorage.setItem('current-user-data', JSON.stringify(res.body['data']))
              localStorage.setItem('current-user-headers', JSON.stringify(tokenHeaders));
              console.log(JSON.parse(localStorage.getItem('current-user-headers')));
              console.log(JSON.parse(localStorage.getItem('current-user-data')));

              res.status ;       
            });
      // return this.http.post('https://infinite-temple-70788.herokuapp.com/users/1/maps?token=zxsF81gRMCF6SgEJ9C3C', map)
      //     .map(res => res.json());   
      }

}

export interface user {
  id: number,
  email: string,
  provider: string,
  uid : string,
  name:string
  nickname: string
  image: string;
}