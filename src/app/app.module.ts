import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponentComponent } from './components/book-component/book-component.component';
import { CartComponentComponent } from './components/cart-component/cart-component.component';
import { CartItemComponentComponent } from './components/cart-item-component/cart-item-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponentComponent,
    CartComponentComponent,
    CartItemComponentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
