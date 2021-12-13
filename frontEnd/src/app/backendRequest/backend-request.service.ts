import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendRequestService<T> {

  constructor(private http: HttpClient) { }

  getData(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  postData(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data);
  }

  putData(url: string, data: T): Observable<T> {
    return this.http.put<T>(url, data);
  }

  deleteData(url: string, id?: number): Observable<T> {
    if (id) {
      return this.http.delete<T>(url + id);
    }

    return this.http.delete<T>(url);
  }
}
