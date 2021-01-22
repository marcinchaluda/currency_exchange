import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Observable} from 'rxjs';
import {Currency} from '../../model/Currency';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  // @ts-ignore
  historicalRates$: Observable<Currency[]>;
  // dataList = this.historicalRates.value;
  // tslint:disable-next-line:variable-name
  constructor(private _httpService: HttpService) {
  }

  ngOnInit(): void {
    this._httpService.getHistoricalRates();
    this.historicalRates$ = this._httpService.getHistoricalRatesAsObservable();
  }
}
