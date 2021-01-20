import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  currencySymbols = this._httpService._currencySymbols$;
  currencyRates = this._httpService._exchangeList$;
  baseCurrency = this._httpService.baseCurrency$;
  // tslint:disable-next-line:variable-name
  _exchangeList = ['USD', 'GBP', 'CHF', 'PLN', 'JPY'];
  amount = 1;
  // tslint:disable-next-line:variable-name
  constructor(private _httpService: HttpService) {
  }

  ngOnInit(): void {
    this.setExchangeListInService(this._exchangeList);
    this._httpService.getExchangeList(this._exchangeList);
  }

  browseCurrencies(event: any, i: number): void {
    this._exchangeList[i] = event.target.value;
    this._httpService.getExchangeList(this._exchangeList);
  }
  // tslint:disable-next-line:typedef
  calculate(amount: number, currValue: number) {
    const sum = (amount * currValue).toFixed(2);
    return sum;
  }

  setExchangeListInService(exchangeList: string[]): void {
    this._httpService.setExchangeList(exchangeList);
  }
}
