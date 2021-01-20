import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../services/http.service';
import {Currency} from '../../model/Currency';
import {faImages, faMoneyBillWave} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  public money = faMoneyBillWave;
  public imgIcon = faImages;
  commonCurrencies = [{currSymbol: 'GBP', currValue: 0.0071155935}, {currSymbol: 'CHF', currValue: 0.0085852373},
    {currSymbol: 'EUR', currValue: 0.0079884966}, {currSymbol: 'USD', currValue: 0.0096373223}];
  // commonCurrencies = new Array<Currency>();
  baseCurrency = '';
  // tslint:disable-next-line:variable-name
  constructor(private _config: NgbCarouselConfig, private _httpService: HttpService) {
    _config.interval = 3000;
    _config.keyboard = true;
    _config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.baseCurrency = this._httpService.getBaseCurrency();
    // this.commonCurrencies = this._httpService.getCurrencies();
    console.log(this.commonCurrencies);
  }

}
