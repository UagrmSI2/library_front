import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    sessionStorage.clear();
    /* Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Sesión Cerrada con Exito!',
      showConfirmButton: false,
      timer: 2000
    }) */
    setTimeout(() => {
      this.router.navigate(["/login"]);
    }, 2500);
  }
}
