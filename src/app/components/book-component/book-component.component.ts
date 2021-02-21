import { Component, OnInit } from '@angular/core';

import { BooksService } from '../../services/books.service';
import { IBook } from '../../models/BookModel';

@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.scss'],
})
export class BookComponentComponent implements OnInit {
  books: IBook[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe((res: any): void => {
      this.books = res;
    });
  }

  buyBook() {}
}
