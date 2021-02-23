import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BasketService } from '../../services/basket.service';
import { IBasket } from '../../models/BasketModel';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.scss'],
})
export class CartComponentComponent implements OnInit, OnDestroy {
  books: IBasket[] = [];

  private dataSubscription: Subscription = new Subscription();

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.dataSubscription = this.basketService.getBasket().subscribe((res: any): void => {
      this.books = res;
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  deleteBook(id: string): void {
    this.books = this.books.filter((el: IBasket) => el.id !== id);
    this.basketService.deleteBook(id);
  }
}
