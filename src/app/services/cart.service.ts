import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ICart } from '../models/CartModel';
import { IBook } from '../models/BookModel';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  books: ICart[] = [];

  CartProduct = new Subject<ICart[]>();

  // private totalQuantity: number = 0;

  // private totalSum: number = 0;

  constructor(private http: HttpClient) {}

  getCart(): void {
    this.http
      .get('https://book-shop-41c29-default-rtdb.europe-west1.firebasedatabase.app/basket.json')
      .toPromise()
      .then((books: any): void => {
        if (books) {
          this.books = books;
          this.CartProduct.next(this.books);
        }
      });
  }

  setCart(): void {
    this.http
      .put(
        'https://book-shop-41c29-default-rtdb.europe-west1.firebasedatabase.app/basket.json',
        this.books,
        { headers: this.headers },
      )
      .subscribe();
  }

  addBook(book: IBook): void {
    const { id, name, price } = book;
    const isInCart = this.books.find((el: ICart) => el.id === id);
    if (isInCart) {
      this.increaseQuantity(id);
    } else {
      this.books.push({ id, name, price, count: 1 });
      this.CartProduct.next(this.books);
      this.setCart();
    }
  }

  removeBook(id: string): void {
    this.books = this.books.filter((el: ICart) => el.id !== id);
    this.CartProduct.next(this.books);
    this.setCart();
  }

  increaseQuantity(id: string): void {
    const book = this.books.find((el: ICart) => el.id === id);
    if (book) {
      const count = book.count + 1;
      this.books = this.changeCartProduct(id, count);
      this.CartProduct.next(this.books);
      this.setCart();
    }
  }

  decreaseQuantity(id: string): void {
    const book = this.books.find((el: ICart) => el.id === id);
    if (book) {
      if (book.count > 1) {
        const count = book.count - 1;
        this.books = this.changeCartProduct(id, count);
        this.CartProduct.next(this.books);
        this.setCart();
      } else {
        this.removeBook(id);
      }
    }
  }

  changeCartProduct(id: string, count: number): ICart[] {
    return this.books.map((el: ICart) => {
      return el.id === id ? { ...el, count } : el;
    });
  }

  removeAllBooks() {
    this.books.length = 0;
    this.CartProduct.next(this.books);
  }

  updateCartData() {}
}
