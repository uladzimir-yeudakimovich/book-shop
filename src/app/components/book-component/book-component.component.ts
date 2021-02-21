import { Component, OnInit } from '@angular/core';

import { IBook } from '../../models/BookModel';

@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.scss'],
})
export class BookComponentComponent implements OnInit {
  books: IBook[] = [];

  constructor() {}

  ngOnInit(): void {}
  
  buyBook() {}
}
