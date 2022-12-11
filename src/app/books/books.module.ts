import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { RatingModule } from 'ng-starrating';
import { BookGridComponent } from './components/book-grid/book-grid.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    BooksComponent,
    BookGridComponent,
    BookPageComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    RatingModule,
    RouterModule,
    PdfViewerModule
  ],
  exports:[
    BookPageComponent
  ]
})
export class BooksModule { }
