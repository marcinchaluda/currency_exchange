import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Currency} from '../model/Currency';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private BASE_URL = 'https://api.exchangeratesapi.io/';
  // tslint:disable-next-line:variable-name
  baseCurrency$ = new BehaviorSubject('EUR');
  // tslint:disable-next-line:variable-name
  _sliderCurrencies$ = new BehaviorSubject(new Array<Currency>());
  // tslint:disable-next-line:variable-name
  _commonCurrencies$ = new BehaviorSubject(new Array<Currency>());
  // tslint:disable-next-line:variable-name
  _latestRates$ = new BehaviorSubject(new Array<Currency>());
  // baseCurr$: Observable<string> = this.baseCurrency.asObservable();
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {

  }
  // tslint:disable-next-line:typedef
  getLatestRates(): Observable<any> {
    // @ts-ignore
    return this._http.get(this.BASE_URL + 'latest');
  }
  // tslint:disable-next-line:typedef
  getRatesForBaseCurrency() {
    return this._http.get(this.BASE_URL + `latest/?base=${this.baseCurrency$.value}`).subscribe(data => {
      // @ts-ignore
      this.generateCommonCurrencies(data.rates);
      // @ts-ignore
      this.generateLatestRates(data.rates);
      // @ts-ignore
      this._sliderCurrencies$.next(data.rates);
    });
  }
  // tslint:disable-next-line:typedef
  generateCommonCurrencies(data: object): void {
    const currencies = new Array<Currency>();
    // @ts-ignore;
    this.baseCurrency = data.base;
    for (const [key, value] of Object.entries(data)) {
      if ((key === 'USD' || key === 'JPY' || key === 'GBP' || key === 'EUR' || key === 'CHF') && key !== this.baseCurrency$.value) {
        // @ts-ignore
        const currencyDetails: Currency = ({
          currSymbol: key,
          currValue: Number(value),
        });
        currencies.push(currencyDetails);
      }
    }
    this._commonCurrencies$.next(currencies);
  }
  // tslint:disable-next-line:typedef
  generateLatestRates(data: object): void {
    const latestRates = new Array<Currency>();
    // @ts-ignore;
    this.baseCurrency = data.base;
    for (const [key, value] of Object.entries(data)) {
      if (key !== this.baseCurrency$.value) {
        // @ts-ignore
        const currencyDetails: Currency = ({
          currSymbol: key,
          currValue: Number(value),
        });
        latestRates.push(currencyDetails);
      }
    }
    this._latestRates$.next(latestRates);
  }

  setBaseCurrency(currency: string): void {
    // @ts-ignore
    this.baseCurrency$.next(currency);
  }
}

