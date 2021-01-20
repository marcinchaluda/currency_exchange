import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  currencyRates = this._httpService._latestRates$;
  baseCurrency = this._httpService.baseCurrency$;
  // tslint:disable-next-line:variable-name
  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getRatesForBaseCurrency();
    console.log(this.currencyRates);
  }

}
