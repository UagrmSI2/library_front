import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books:any=[]
  booksSlide:any=[]
  constructor(private _bookService:BooksService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(){
    this._bookService.getAllBooks().subscribe(
      Response=>{
        this.books=Response;
        this.booksSlide=Response;
      }
    )
  }

}
