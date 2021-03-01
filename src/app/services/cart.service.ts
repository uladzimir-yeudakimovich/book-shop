import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ICart } from '../models/CartModel';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getCart() {
    return this.http.get(
      'https://book-shop-41c29-default-rtdb.europe-west1.firebasedatabase.app/basket.json',
    );
  }

  setCart(books: ICart[]) {
    return this.http.put(
      'https://book-shop-41c29-default-rtdb.europe-west1.firebasedatabase.app/basket.json',
      books,
      { headers: this.headers },
    );
  }
}
