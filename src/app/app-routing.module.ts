import {NgModule} from '@angular/core';
import {ExtraOptions, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  onSameUrlNavigation: 'reload',
  preloadingStrategy: PreloadAllModules
};

const appRoutes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  { path: 'restaurants', loadChildren: () => import('./restaurants/restaurants.module').then(m => m.RestaurantsModule)},
  { path: 'search', loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)},
  { path: 'error', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
