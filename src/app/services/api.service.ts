import { Injectable } from '@angular/core';
import { Auth } from '../auth/auth';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { CompanyData } from '../auth/company-data';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint: string = environment.apiBaseUrl;
  headers = new HttpHeaders().set('Contant-Type', 'application/x-www-form-urlencoded');//Set a Header Value.
  constructor(private http: HttpClient) { }

  //Method for calling Register API
  submitSignup(data: Auth): Observable<any> {
    try {
      data.redirectUrl = `${environment.appBaseUrl}/users/generate-password`;   // Provide daynamic environment 
      let apiURL = `${this.endpoint}/user/signup-via-email`;
      return this.http.post(apiURL, data).pipe(
        catchError(this.errorMgmt)
      )
    }
    catch (err) {
      console.log(err);
    }
  }

  //Method for calling login API
  submitLogin(data: Auth): Observable<any> {
    try {
      let apiURL = `${this.endpoint}/users/login`;
      return this.http.post(apiURL, data).pipe(
        catchError(this.errorMgmt)
      )
    }
    catch (err) {
      console.log(err);
    }
  }

  //Method for Submit password and calling API
  submitPasswordData(data: Auth, token: string): Observable<any> {
    try {
      data.token = token;
      let apiURL = `${this.endpoint}/user/confirm-registration`;
      return this.http.post(apiURL, data).pipe(
        catchError(this.errorMgmt)
      )
    }
    catch (err) {
      console.log(err);
    }
  }

  //Method for Submit forgot mail and calling API
  submitForgotPasswordData(data: Auth): Observable<any> {
    try {
      data.redirectUrl = `${environment.appBaseUrl}/users/reset-password`;
      let apiURL = `${this.endpoint}/user/password/request-reset`;
      return this.http.post(apiURL, data).pipe(
        catchError(this.errorMgmt)
      )
    }
    catch (err) {
      console.log(err);
    }
  }

  //Method for Submit password and calling API
  submitResetPasswordData(data: Auth, token: string): Observable<any> {
    try {
      data.token = token;
      let apiURL = `${this.endpoint}/user/password/set`;
      return this.http.post(apiURL, data).pipe(
        catchError(this.errorMgmt)
      )
    }
    catch (err) {
      console.log(err);
    }
  }


  //Create method for manage errors when request and return response from the server
  errorMgmt(error: HttpErrorResponse) {
    try {
      let errorMessage = '';
      //Handle client side error
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      }
      //Handle server side error
      else {
        errorMessage = `Error code:${error.status}\nMessage:${errorMessage}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
    catch (err) {
      console.log(err);
    }
  }

//Method for logout
  submitLogout(): void {
    localStorage.setItem('token', "undefined");
    sessionStorage.removeItem('companyId');
  }

  //Method for submit company form Data and calling API
  submitCompanyData(data: CompanyData): Observable<any> {
    try {
      const parentUserId = localStorage.getItem("token");
      let apiURL = `${this.endpoint}/company/add-company/${parentUserId}`;
      return this.http.post(apiURL, data).pipe(
        catchError(this.errorMgmt)
      )
    }
    catch (err) {
      console.log(err);
    }
  }

  //Method for submit updated company form Data and calling API
  submitUpdateCompanyData(data: CompanyData,companyId: String): Observable<any> {
    try {
      const parentUserId = localStorage.getItem("token");
      let apiURL = `${this.endpoint}/company/update-company/${parentUserId}/${companyId}`;
      return this.http.post(apiURL, data).pipe(
        catchError(this.errorMgmt)
      )
    }
    catch (err) {
      console.log(err);
    }
  }
 
// Method for get data from server and show company list
  getListData(): Observable<any> {
    try {
      const parentUserId = localStorage.getItem("token");
      let apiURL = `${this.endpoint}/company/company-list/${parentUserId}`;
       return this.http.get(apiURL).pipe(
         catchError(this.errorMgmt)
       )
    }
    catch (err) {
      console.log(err);
    }
  }

  // Method for get individual company data
  getIndividualData(companyId:String):Observable<any>{
    try{
      let apiURL = `${this.endpoint}/company/individual-company-list/${companyId}`;
      return this.http.get(apiURL).pipe(
        catchError(this.errorMgmt)
      )
    }catch(err){
      console.log(err);
    }
  }

//Method for Delete data of company list
    removeData(companyId:String):Observable<any>{
      try{
        let apiURL = `${this.endpoint}/company/delete-company/${companyId}`;
        return this.http.delete(apiURL).pipe(
          catchError(this.errorMgmt)
        )
      }
      catch(err){
        console.log(err);
      }
    }
}
