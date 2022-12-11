import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl='http://localhost:3000/api/'
  constructor(private http: HttpClient) { }


  getAllBooks(){
    return this.http.get(this.baseUrl+'books');
  }
  getABook(id:string){
    return this.http.get(this.baseUrl+'books/'+id);
  }
}
