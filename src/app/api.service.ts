import { Injectable } from '@angular/core';
import { Auth } from './auth';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError  } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  endpoint:string ="http://localhost:3002";
  headers = new HttpHeaders().set('Contant-Type', 'application/x-www-form-urlencoded');


  constructor(private http:HttpClient) { }

    submitSignup(data:Auth): Observable<any>{
      data.redirectUrl = "https://www.mailinator.com";
      let apiURL = `${this.endpoint}/user/signup-via-email`;
      return this.http.post(apiURL, data).pipe(
        catchError(this.errorMgmt)
      )
    }

    submitLogin(data:Auth): Observable<any>{
      let apiURL = `${this.endpoint}/users/login`;
      return this.http.post(apiURL, data).pipe(
        catchError(this.errorMgmt)
      )
    }


    errorMgmt(error: HttpErrorResponse){
      let errorMessage = '';
      if(error.error instanceof ErrorEvent){
        errorMessage= error.error.message;
      }
      else{
        errorMessage = `Error code:${error.status}\nMessage:${errorMessage}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }

}
