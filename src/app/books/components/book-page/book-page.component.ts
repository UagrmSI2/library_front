import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../../services/books/books.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit,AfterViewInit {
  id='';
  book:any;
  innerHeight:any;
  constructor(private route:ActivatedRoute, private _bookService:BooksService) { 
    
  }
  ngAfterViewInit(): void {
  
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.id=params['id'];
        this.getBookInfo();
      }
    )

    
  }

  getBookInfo(){
    this._bookService.getABook(this.id).subscribe(
      Response=>{
        this.book=Response;
        console.log(this.book)
        this.innerHeight=window.innerHeight
        console.log(this.innerHeight);
      }
    )
  }

}
