import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/Constants';
import { Utils } from 'src/app/Utils';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router:Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  saveUser(forma:NgForm){
    this._userService.postUser(forma.value).subscribe(
      Response=>{
        Utils.set(Constants.ACTUAL_ACCESS_TOKEN, Response.token);
        Utils.set(Constants.ACTUAL_USER_STATUS_PHOTOS,Response.statusPhoto),
        this.router.navigate(['/webcam']);
      }
    )
  }
}
