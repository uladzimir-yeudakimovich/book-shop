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
    let count = 1;
    const isInBasket = this.books.find((el: IBasket) => el.id === id);
    if (isInBasket) {
      count += isInBasket.count;
      this.books = this.books.map((el: IBasket) => (el.id === id ? { ...el, count } : el));
    } else {
      this.books.push({ id, name, price, count });
    }
    this.updateDataSubscription = this.basketService.setBasket(this.books).subscribe();
  }

  deleteBook(id: string): void {
    this.books = this.books.filter((el: IBasket) => el.id !== id);
    this.updateDataSubscription = this.basketService.setBasket(this.books).subscribe();
  }
}
