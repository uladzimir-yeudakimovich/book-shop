import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ICart } from '../../models/CartModel';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item-component.component.html',
  styleUrls: ['./cart-item-component.component.scss'],
})
export class CartItemComponentComponent {
  @Input() books: ICart[] = [];

  @Output() delete = new EventEmitter<string>();

  @Output() increase = new EventEmitter<string>();

  @Output() decrease = new EventEmitter<string>();

  checkCount(index: number, book: ICart) {
    return book.count;
  }
}
