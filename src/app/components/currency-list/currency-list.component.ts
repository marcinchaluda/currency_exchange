import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Currency} from '../../model/Currency';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  currencyRates = new Array<Currency>();
  baseCurrency = '';
  // tslint:disable-next-line:variable-name
  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this.getLatestRates();
  }
  // tslint:disable-next-line:typedef
  getLatestRates() {
    this.currencyRates.length = 0;
    this._httpService.getRatesForBaseCurrency().subscribe(data => {
      this.baseCurrency = this._httpService.getBaseCurrency();
      for (const [key, value] of Object.entries(data.rates)) {
          const currencyDetails: Currency = ({
            currSymbol: key,
            currValue: Number(value),
          });
          this.currencyRates.push(currencyDetails);
      }
    });
  }
}
