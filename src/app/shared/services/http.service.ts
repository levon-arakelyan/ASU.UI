import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { IHttpService } from 'src/app/core/services/interfaces/ihttp.service';
import { HttpMethod } from 'src/app/core/enums/http-method';

@Injectable({
  'providedIn': 'root'
})
export class HttpService implements IHttpService {
    
  constructor(
    private readonly httpClient: HttpClient,
    private readonly httpErrorHandlerService: HttpErrorHandlerService,
  ) { }

  get<T>(url: string): Observable<T> {
    return this.executeRequest<T>(HttpMethod.Get, url, null);
  }
  post<T>(url: string, body: any = null): Observable<T> {
    return this.executeRequest<T>(HttpMethod.Post, url, body);
  }
  put<T>(url: string, body: any = null): Observable<T> {
    return this.executeRequest<T>(HttpMethod.Put, url, body);
  }
  delete<T>(url: string): Observable<T> {
    return this.executeRequest<T>(HttpMethod.Delete, url, null);
  }
  patch<T>(url: string, body: any = null): Observable<T> {
    return this.executeRequest<T>(HttpMethod.Patch, url, body);
  }

  private executeRequest<T>(httpMethod: HttpMethod, url: string, body: any = null): Observable<T> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    
    var request : Observable<T>;
    
    switch (httpMethod) {
      case HttpMethod.Get:
        request = this.httpClient.get<T>(url, { headers: headers });
        break;
      case HttpMethod.Post:
        request = this.httpClient.post<T>(url, body, { headers: headers });
        break;
      case HttpMethod.Put:
        request = this.httpClient.put<T>(url, body, { headers: headers });
        break;
      case HttpMethod.Patch:
        request = this.httpClient.patch<T>(url, body, { headers: headers });
        break;
      case HttpMethod.Delete:
        request = this.httpClient.delete<T>(url, { headers: headers });
        break;
    }

    return request
      .pipe(
        catchError(err => {
          this.httpErrorHandlerService.handleError(err);
          return throwError(() => err);
        })
      );
  }
}