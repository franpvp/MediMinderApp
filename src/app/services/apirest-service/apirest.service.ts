import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }
  apiUrl = 'https://jsonplaceholder.typicode.com';

  // CONJUNTO DE INFORMACION SIN FILTRAR
  getPosts():Observable<any> {
    return this.httpClient.get(this.apiUrl + '/posts/').pipe(
      retry(3)
    ); 
  }
  // CONJUNTO DE INFORMACION CON FILTRO
  getPost(id: number):Observable<any> {
    return this.httpClient.get(this.apiUrl + '/posts/' + id).pipe(
      retry(3)
    );
  }

  createPost(post: any):Observable<any> {
    return this.httpClient.post(this.apiUrl + '/posts', post, this.httpOptions).pipe(
      retry(3)
    );
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.httpClient.put(this.apiUrl + '/posts/' + id, post, this.httpOptions).pipe(
      retry(3)
    );
  }

  deletePost(id: number):Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/posts/' +id, this.httpOptions)
  }
}
