import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { IBasket } from '../../models/BasketModel';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item-component.component.html',
  styleUrls: ['./cart-item-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponentComponent {
  @Input() books: IBasket[] = [];

  @Output() delete = new EventEmitter<string>();

  @Output() increase = new EventEmitter<string>();

  @Output() decrease = new EventEmitter<string>();

  checkCount(index: number, book: IBasket) {
    return book.count;
  }
}
