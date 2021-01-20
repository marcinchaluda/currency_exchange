import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Currency} from '../../model/Currency';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  currencyRates = this._httpService._latestRates$;
  baseCurrency = this._httpService.baseCurrency$;
  // tslint:disable-next-line:variable-name
  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getRatesForBaseCurrency();
  }
}
