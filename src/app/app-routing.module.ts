import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrencyListComponent} from './components/currency-list/currency-list.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {ExchangeComponent} from './components/exchange/exchange.component';
import {ChartComponent} from './components/chart/chart.component';

const routes: Routes = [
  { path: 'home', component: CarouselComponent },
  { path: 'list', component: CurrencyListComponent },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'chart', component: ChartComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
