import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  subscriptions: Array<any>;
  constructor(private payment: PaymentService) { 
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.getSubscriptions();
  }
  
  getSubscriptions(){
    this.payment.getTypeOfSubscriptiones().subscribe(
      {
        next: (res: any) => {
          this.subscriptions = res.detalle;
        },
        error(error: any) {
          console.log(error);
          
        },
      }
    );
  }

  createOrder(subscriptionId: any){
    let userData = {
      userId: 1,
      subscriptionId: subscriptionId
    };
    this.payment.createOrder(userData).subscribe(
      {
                
        next: (res: any) => {
          console.log(res);
          window.location.href = res.detalle.href;
        },
        error(error: any) {
          console.log(error);
          
        },
      }
    );
  }
}
