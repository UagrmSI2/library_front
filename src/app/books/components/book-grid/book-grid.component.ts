import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.css']
})
export class BookGridComponent implements OnInit {
  @Input() books:any[]=[];
  constructor(private router:Router) {
   }


  ngOnInit(): void {
    console.log(this.books);
  }

  goToRead(id:string){
    console.log(id);
    this.router.navigate(['/books/'+id])
  }

}
