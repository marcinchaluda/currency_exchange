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
  commonCurrencies$ = this._httpService._commonCurrencies$;
  baseCurrency = this._httpService.baseCurrency$;
  // tslint:disable-next-line:variable-name
  constructor(private _config: NgbCarouselConfig, private _httpService: HttpService) {
    _config.interval = 2000;
    _config.keyboard = true;
    _config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this._httpService.getRatesForBaseCurrency();
  }

}
