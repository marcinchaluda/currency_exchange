import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {faChartBar, faExchangeAlt, faHome, faThList} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  currencySymbols = this._httpService._currencySymbols$;
  baseCurrency = this._httpService.baseCurrency$;
  exchangeList = [];
  faHome = faHome;
  faExchange = faExchangeAlt;
  faChart = faChartBar;
  faList = faThList;
  // tslint:disable-next-line:variable-name
  constructor(private _httpService: HttpService) {
  }

  ngOnInit(): void {
    this._httpService.getRatesForBaseCurrency();
    // @ts-ignore
    this.baseCurrency = this._httpService.baseCurrency$;
  }
  // tslint:disable-next-line:typedef
  selectChangeHandler(event: any): void {
    // @ts-ignore
    this.exchangeList = this._httpService.getBaseCurrencyList();
    this.setBaseCurrencyInService(event.target.value);
    this._httpService.getRatesForBaseCurrency();
    this._httpService.getExchangeList(this.exchangeList);
    this._httpService.getHistoricalRates();
  }
  // tslint:disable-next-line:typedef
  private setBaseCurrencyInService(baseCurrency: string): void {
    this._httpService.setBaseCurrency(baseCurrency);
  }
}
