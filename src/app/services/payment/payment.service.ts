import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url = "https://localhost:7160/api/";
  constructor(private router: Router, private http: HttpClient) { 
    
  }
  
  getTypeOfSubscriptiones(): Observable<any>{
    return this.http.get( this.url + "subscriptions/getSubscriptions");
  }

  createOrder(userData: any): Observable<any>{
    return this.http.post(this.url + "AuthPaypal/paypalCreateOrder", userData);
  } 
  approveOrder(token: any): Observable<any>{
    return this.http.post(this.url + `AuthPaypal/paypalApproveOrder?token=${token}`, "");
  } 
}
