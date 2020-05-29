import {NgModule} from '@angular/core';
import {ProductsComponent} from './products.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductListComponent} from './product-list/product-list.component';
import {RouterModule} from '@angular/router';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductItemComponent} from './product-list/product-item/product-item.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductItemComponent,
  ],
    imports: [
        RouterModule,
        ProductsRoutingModule,
        CommonModule,
        FormsModule,
        FontAwesomeModule
    ]
})
export class ProductsModule { }
