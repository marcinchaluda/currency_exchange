import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Currency} from '../model/Currency';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private BASE_URL = 'https://api.exchangeratesapi.io/';
  // tslint:disable-next-line:variable-name
  private _baseCurrency = 'EUR';
  // tslint:disable-next-line:variable-name
  private _currencies = new Array<Currency>();
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) { }
  // tslint:disable-next-line:typedef
  getLatestRates(): Observable<any> {
    // @ts-ignore
    return this._http.get(this.BASE_URL + 'latest');
  }
  // tslint:disable-next-line:typedef
  getRatesForBaseCurrency(): Observable<any> {
    const param = new HttpParams().set('base', this._baseCurrency);
    return this._http.get(this.BASE_URL + 'latest', {params: param});
  }

  setBaseCurrency(currency: string): void {
    this._baseCurrency = currency;
  }
  // tslint:disable-next-line:typedef
  setCurrencies(value: Array<Currency>) {
    this._currencies = value;
  }

  getBaseCurrency(): string {
    return this._baseCurrency;
  }
  getCurrencies(): Currency[] {
    return this._currencies;
  }
}

