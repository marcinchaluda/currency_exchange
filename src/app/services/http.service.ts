import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Currency} from '../model/Currency';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private BASE_URL = 'https://api.exchangeratesapi.io/';
  // tslint:disable-next-line:variable-name
  _currencySymbols$ = new BehaviorSubject(new Array<string>());
  baseCurrency$ = new BehaviorSubject('EUR');
  // tslint:disable-next-line:variable-name
  _sliderCurrencies$ = new BehaviorSubject(new Array<Currency>());
  // tslint:disable-next-line:variable-name
  _commonCurrencies$ = new BehaviorSubject(new Array<Currency>());
  // tslint:disable-next-line:variable-name
  _latestRates$ = new BehaviorSubject(new Array<Currency>());
  // baseCurr$: Observable<string> = this.baseCurrency.asObservable();
  // tslint:disable-next-line:variable-name
  _latestApiUpdate$ = new BehaviorSubject('');
  // tslint:disable-next-line:variable-name
  _historicalRates$ = new BehaviorSubject([]);
  // tslint:disable-next-line:variable-name
  private _baseCurrencyList = ['USD', 'GBP', 'CHF', 'EUR', 'JPY'];
  // tslint:disable-next-line:variable-name
  _exchangeList$ = new BehaviorSubject(new Array<Currency>());
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {

  }
  // tslint:disable-next-line:typedef
  getRatesForBaseCurrency() {
    return this._http.get(this.BASE_URL + `latest/?base=${this.baseCurrency$.value}`).subscribe(data => {
      // @ts-ignore
      this.generateCommonCurrencies(data.rates);
      // @ts-ignore
      this.generateLatestRates(data.rates);
      // @ts-ignore
      this.getLatestRates(data.rates);
      // @ts-ignore
      this._sliderCurrencies$.next(data.rates);
      // @ts-ignore
      this._latestApiUpdate$.next(data.date);
      // @ts-ignore
    });
  }
  // tslint:disable-next-line:typedef
  getLatestRates(): Observable<any> {
    // @ts-ignore
    return this._http.get(this.BASE_URL + 'latest').subscribe(data => {
      const symbols = new Array<string>();
      // @ts-ignore
      this.baseCurrency = data.base;
      // @ts-ignore
      for (const currencyKey of Object.keys(data.rates)) {
        symbols.push(currencyKey);
      }
      symbols.push('EUR');
      this._currencySymbols$.next(symbols);
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
          url: '../../../assets/' + key + '.png',
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

  getExchangeList(array: string[]): void {
    const exCurr = new Array<Currency>();
    // @ts-ignore
    return this._http.get(this.BASE_URL + `latest/?base=${this.baseCurrency$.value}`).subscribe(data => {
      // @ts-ignore
      for (const [key, value] of Object.entries(data.rates)) {
        // tslint:disable-next-line:forin
        for (const i in array) {
          if (key === array[i]) {
            const currencyDetails: Currency = ({
              currSymbol: key,
              currValue: Number(value),
            });
            exCurr.push(currencyDetails);
          }
        }
        this._exchangeList$.next(exCurr);
      }
    });
  }
  // tslint:disable-next-line:typedef
  getHistoricalRates() {
    // @ts-ignore
    const historicalRates = [];
    return this._http.get(this.BASE_URL + `latest/?base=${this.baseCurrency$.value}`).subscribe(data => {
      // @ts-ignore
      // console.log(data.rates);
      this.baseCurrency = data.base;
      // @ts-ignore
      for (const [key, value] of Object.entries(data.rates)) {
        if (!(key === 'IDR' || key === 'KRW')) {
          // @ts-ignore
          const currencyDetails = {
            name: key,
            value: Number(value),
          };
          historicalRates.push(currencyDetails);
        }
      }
      // @ts-ignore
      this._historicalRates$.next(historicalRates);
    });
  }
  // @ts-ignore
  getHistoricalRatesAsObservable(): Observable<Array<Currency>> {
    return this._historicalRates$.asObservable();
  }
  setBaseCurrency(currency: string): void {
    // @ts-ignore
    this.baseCurrency$.next(currency);
  }
  // tslint:disable-next-line:typedef
  setExchangeList(value: string[]) {
    this._baseCurrencyList = value;
  }

  getBaseCurrencyList(): string[] {
    return this._baseCurrencyList;
  }
}

