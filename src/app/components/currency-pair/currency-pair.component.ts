import {Component, Input, OnInit} from '@angular/core';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-currency-pair',
  templateUrl: './currency-pair.component.html',
  styleUrls: ['./currency-pair.component.scss']
})
export class CurrencyPairComponent implements OnInit {
  public money = faMoneyBillWave;
  public imgIcon = faImages;
  @Input()
  public baseCurrency = '';
  @Input()
  public currencySymbol = '';
  @Input()
  public currencyValue = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
