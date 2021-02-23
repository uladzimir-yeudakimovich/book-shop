import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IBasket } from '../models/BasketModel';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getBasket() {
    return this.http.get(
      'https://book-shop-41c29-default-rtdb.europe-west1.firebasedatabase.app/basket.json',
    );
  }

  setBasket(books: IBasket[]) {
    return this.http.put(
      'https://book-shop-41c29-default-rtdb.europe-west1.firebasedatabase.app/basket.json',
      books,
      { headers: this.headers },
    );
  }
}
