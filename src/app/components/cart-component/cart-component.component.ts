import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BasketService } from '../../services/basket.service';
import { IBasket } from '../../models/BasketModel';
import { IBook } from '../../models/BookModel';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.scss'],
})
export class CartComponentComponent implements OnInit, OnDestroy {
  books: IBasket[] = [];

  private dataSubscription: Subscription = new Subscription();

  private updateDataSubscription: Subscription = new Subscription();

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.dataSubscription = this.basketService.getBasket().subscribe((res: any): void => {
      if (res) this.books = res;
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.updateDataSubscription.unsubscribe();
  }

  addBook(book: IBook): void {
    const { id, name, price } = book;
    const isInBasket = this.books.find((el: IBasket) => el.id === id);
    if (isInBasket) {
      this.increaseBook(id);
    } else {
      this.books.push({ id, name, price, count: 1 });
      this.updateDataSubscription = this.basketService.setBasket(this.books).subscribe();
    }
  }

  deleteBook(id: string): void {
    this.books = this.books.filter((el: IBasket) => el.id !== id);
    this.updateDataSubscription = this.basketService.setBasket(this.books).subscribe();
  }

  increaseBook(id: string): void {
    const book = this.books.find((el: IBasket) => el.id === id);
    if (book) {
      const count = book.count + 1;
      this.books = this.books.map((el: IBasket) => (el.id === id ? { ...el, count } : el));
      this.updateDataSubscription = this.basketService.setBasket(this.books).subscribe();
    }
  }

  decreaseBook(id: string): void {
    const book = this.books.find((el: IBasket) => el.id === id);
    if (book) {
      if (book.count > 1) {
        const count = book.count - 1;
        this.books = this.books.map((el: IBasket) => (el.id === id ? { ...el, count } : el));
        this.updateDataSubscription = this.basketService.setBasket(this.books).subscribe();
      } else {
        this.deleteBook(id);
      }
    }
  }
}
