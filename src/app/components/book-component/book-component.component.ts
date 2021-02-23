import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BooksService } from '../../services/books.service';
import { IBook } from '../../models/BookModel';

@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.scss'],
})
export class BookComponentComponent implements OnInit, OnDestroy {
  @Output() add = new EventEmitter<IBook>();

  books: IBook[] = [];

  private dataSubscription: Subscription = new Subscription();

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.dataSubscription = this.booksService.getBooks().subscribe((res: any): void => {
      this.books = res;
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
