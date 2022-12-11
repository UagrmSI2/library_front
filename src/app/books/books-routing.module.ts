import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookPageComponent } from './components/book-page/book-page.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: ':id',component:BookPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
