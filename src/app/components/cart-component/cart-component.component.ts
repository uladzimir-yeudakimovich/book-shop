import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { ICart } from '../../models/CartModel';
import { IBook } from '../../models/BookModel';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.scss'],
})
export class CartComponentComponent implements OnInit, OnDestroy {
  books: ICart[] = [];

  private dataSubscription: Subscription = new Subscription();

  private updateDataSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.dataSubscription = this.cartService.getCart().subscribe((res: any): void => {
      if (res) this.books = res;
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.updateDataSubscription.unsubscribe();
  }

  addBook(book: IBook): void {
    const { id, name, price } = book;
    const isInCart = this.books.find((el: ICart) => el.id === id);
    if (isInCart) {
      this.increaseBook(id);
    } else {
      this.books.push({ id, name, price, count: 1 });
      this.updateDataSubscription = this.cartService.setCart(this.books).subscribe();
    }
  }

  deleteBook(id: string): void {
    this.books = this.books.filter((el: ICart) => el.id !== id);
    this.updateDataSubscription = this.cartService.setCart(this.books).subscribe();
  }

  increaseBook(id: string): void {
    const book = this.books.find((el: ICart) => el.id === id);
    if (book) {
      const count = book.count + 1;
      this.books = this.books.map((el: ICart) => (el.id === id ? { ...el, count } : el));
      this.updateDataSubscription = this.cartService.setCart(this.books).subscribe();
    }
  }

  decreaseBook(id: string): void {
    const book = this.books.find((el: ICart) => el.id === id);
    if (book) {
      if (book.count > 1) {
        const count = book.count - 1;
        this.books = this.books.map((el: ICart) => (el.id === id ? { ...el, count } : el));
        this.updateDataSubscription = this.cartService.setCart(this.books).subscribe();
      } else {
        this.deleteBook(id);
      }
    }
  }
}
