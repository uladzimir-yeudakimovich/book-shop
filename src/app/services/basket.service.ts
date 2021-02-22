import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBasket } from '../models/BasketModel';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}

  getBasket() {
    return this.http.get(
      'https://book-shop-41c29-default-rtdb.europe-west1.firebasedatabase.app/basket.json',
    );
  }

  addBook(book: IBasket) {
    const count = 1;
    console.log('buy: ', { ...book, count });
  }

  deleteBook(id: string) {
    console.log('delete: ', id);
  }
}
