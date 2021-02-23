import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IBasket } from '../../models/BasketModel';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item-component.component.html',
  styleUrls: ['./cart-item-component.component.scss'],
})
export class CartItemComponentComponent {
  @Input() books: IBasket[] = [];

  @Output() delete = new EventEmitter<string>();
}
