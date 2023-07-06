import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsComponent } from './components/carts/carts.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CartsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CartsComponent
  ]
})
export class CartsModule { }
