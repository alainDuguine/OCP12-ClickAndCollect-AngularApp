import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
  { path: 'menus', loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
