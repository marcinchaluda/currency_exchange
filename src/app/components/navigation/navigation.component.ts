import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import {Currency} from '../../model/Currency';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  currencySymbols = new Array<string>();
  currencies = new Array<Currency>();
  baseCurrency = '';
  faHome = faHome;
  faExchange = faExchangeAlt;
  faChart = faChartBar;
  faList = faThList;
  // tslint:disable-next-line:variable-name
  constructor(private _httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getCurrenciesSymbols();
    this.getCurrenciesRates();
  }
  // tslint:disable-next-line:typedef
  getCurrenciesSymbols(): void {
    this._httpService.getLatestRates().subscribe(data => {
      this.baseCurrency = data.base;
      for (const currencyKey of Object.keys(data.rates)) {
        this.currencySymbols.push(currencyKey);
      }
      this.currencySymbols.push(this.baseCurrency);
    });
  }
  // tslint:disable-next-line:typedef
  selectChangeHandler(event: any): void {
    this.baseCurrency = event.target.value;
    this.setBaseCurrencyInService(this.baseCurrency);
    this.getCurrenciesRates();
    this.setCurrenciesInService(this.currencies);
    console.log(this.baseCurrency);
  }
  // tslint:disable-next-line:typedef
  private setBaseCurrencyInService(baseCurrency: string): void {
    this._httpService.setBaseCurrency(baseCurrency);
  }
  private setCurrenciesInService(currencies: Array<Currency>): void {
    this._httpService.setCurrencies(currencies);
  }
  // tslint:disable-next-line:typedef
  getCurrenciesRates() {
    this.currencies.length = 0;
    this._httpService.getRatesForBaseCurrency().subscribe(data => {
      for (const [key, value] of Object.entries(data.rates)) {
        if ((key === 'USD' || key === 'JPY' || key === 'GBP' || key === 'EUR' || key === 'CHF') && key !== this.baseCurrency) {
          // @ts-ignore
          const currencyDetails: Currency = ({
            currSymbol: key,
            currValue: Number(value),
          });
          this.currencies.push(currencyDetails);
        }
      }
      console.log(this.currencies);
    });
  }
}
