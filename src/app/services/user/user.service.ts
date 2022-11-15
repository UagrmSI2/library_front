import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api-service.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public _http:HttpClient,
    private _requestService: ApiService = new ApiService(_http)
  ) { }

  postPhotos(userImage:any):Observable<any>{
    return this._requestService.post('user/images',userImage);
  }

  postUser(form:any):Observable<any>{
    return this._requestService.post('user',form)
  }

  login(user:User):Observable<any>{
    return this._requestService.post('user/login',user);
  }
}
