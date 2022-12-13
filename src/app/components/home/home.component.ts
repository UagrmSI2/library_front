import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentService } from '../../services/payment/payment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: ActivatedRoute, private paymentService: PaymentService) { 

  }

  ngOnInit(): void {
    /* let tokenApproved = this.router.snapshot.paramMap.get("token");
    console.log(tokenApproved); */
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");
    console.log("El token es:", token);
    
    this.paymentService.approveOrder(token).subscribe(
      {
        next: (res: any) => {
          console.log(res);
        },
        error(error: any) {
          console.log(error.error);
        },
      }
    );
  }

  /* approveOrder(): Observable<any>{
  } */

}
