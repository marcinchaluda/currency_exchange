import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrencyListComponent} from './components/currency-list/currency-list.component';
import {CarouselComponent} from './components/carousel/carousel.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'  },
  { path: '', component: CarouselComponent },
  { path: 'list', component: CurrencyListComponent },
  { path: 'exchange', component: CurrencyListComponent },
  { path: 'chart', component: CurrencyListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
