import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products.component';
import {ProductEditComponent} from './product-edit/product-edit.component';


const routes: Routes = [
  {path: '',
    component: ProductsComponent,
    children: [
      {path: 'new', component: ProductEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
