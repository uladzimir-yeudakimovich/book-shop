import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BasketService } from '../../services/basket.service';
import { IBasket } from '../../models/BasketModel';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item-component.component.html',
  styleUrls: ['./cart-item-component.component.scss'],
})
export class CartItemComponentComponent implements OnInit, OnDestroy {
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

  deleteBook(id: string) {
    this.basketService.deleteBook(id);
  }
}
