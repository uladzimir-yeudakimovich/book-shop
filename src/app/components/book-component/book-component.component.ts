import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BooksService } from '../../services/books.service';
import { BasketService } from '../../services/basket.service';
import { IBook } from '../../models/BookModel';

@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.scss'],
})
export class BookComponentComponent implements OnInit, OnDestroy {
  books: IBook[] = [];

  private dataSubscription: Subscription = new Subscription();

  constructor(private booksService: BooksService, private basketService: BasketService) {}

  ngOnInit(): void {
    this.dataSubscription = this.booksService.getBooks().subscribe((res: any): void => {
      this.books = res;
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  buyBook(book: IBook) {
    const { id, name, price } = book;
    this.basketService.addBook({ id, name, price });
  }
}
