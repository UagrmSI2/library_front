import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/Constants';
import { User } from 'src/app/interfaces/user';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { UserService } from 'src/app/services/user/user.service';
import { Utils } from 'src/app/Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:User
  constructor(
    private router:Router,
    private _userService:UserService,
    private _imageDataService:SharedDataService
  ) { 
    this.user= new User('','');
  }

  ngOnInit(): void {
  }

  login(){
    this._userService.login(this.user).subscribe(
      Response=>{
        console.log(Response);
        Utils.set(Constants.ACTUAL_ACCESS_TOKEN, Response.token);
        this._imageDataService.changeMessage(Response.photos)
        alert('inicio perrron')
        this.router.navigate(['/loginAuth'])
      }
    )
  }

  goToRegister(){

  }
}
