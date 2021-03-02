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

  private booksSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart();
    this.booksSubscription = this.cartService.CartProduct.subscribe((books: ICart[]) => {
      this.books = books;
    });
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

  addBook(book: IBook): void {
    this.cartService.addBook(book);
  }

  deleteBook(id: string): void {
    this.cartService.removeBook(id);
  }

  increaseBook(id: string): void {
    this.cartService.increaseQuantity(id);
  }

  decreaseBook(id: string): void {
    this.cartService.decreaseQuantity(id);
  }
}
