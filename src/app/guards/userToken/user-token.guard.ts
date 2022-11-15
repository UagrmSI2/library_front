import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/Constants';
import { Utils } from 'src/app/Utils'

@Injectable({
  providedIn: 'root'
})
export class UserTokenGuard implements CanActivate {
  constructor(
    private router:Router
  ){}

  canActivate(){
    if(Utils.get(Constants.ACTUAL_ACCESS_TOKEN)){
      console.log(Utils.get(Constants.ACTUAL_ACCESS_TOKEN))
      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
