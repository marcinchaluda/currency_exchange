import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';

import {HttpService} from './services/http.service';
import {NavigationComponent} from './components/navigation/navigation.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbCarouselConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselComponent} from './components/carousel/carousel.component';
import {FooterComponent} from './components/footer/footer.component';
import {CurrencyListComponent} from './components/currency-list/currency-list.component';
import {ExchangeComponent} from './components/exchange/exchange.component';
import {ChartComponent} from './components/chart/chart.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    CarouselComponent,
    FooterComponent,
    CurrencyListComponent,
    ExchangeComponent,
    ChartComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
    ],
  providers: [HttpService, NgbCarouselConfig],
  bootstrap: [AppComponent]
})
export class AppModule {
}
