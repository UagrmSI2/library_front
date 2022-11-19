import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  public imageData=[];
  public subject = new Subject<any>();
  private messageSource= new BehaviorSubject(this.imageData);
  currentMessage= this.messageSource.asObservable();

  changeMessage(message:any){
    this.messageSource.next(message);
  }
}
