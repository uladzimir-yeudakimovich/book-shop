import { Component, OnInit } from '@angular/core';

import { BasketService } from '../../services/basket.service';
import { IBasket } from '../../models/BasketModel';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item-component.component.html',
  styleUrls: ['./cart-item-component.component.scss'],
})
export class CartItemComponentComponent implements OnInit {
  books: IBasket[] = [];

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.getBasket().subscribe((res: any): void => {
      this.books = res;
    });
  }

  deleteBook() {}
}
