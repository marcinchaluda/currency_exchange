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
  private SLIDE_NUMBER = 2;
  public money = faMoneyBillWave;
  public imgIcon = faImages;
  private reader;
  urls = ['../../../assets/JPY.png', '../../../assets/CHF.png', '../../../assets/USD.png', '../../../assets/GBP.png',
    '../../../assets/EUR.png'];
  commonCurrencies$ = this._httpService._commonCurrencies$;
  baseCurrency = this._httpService.baseCurrency$;
  // tslint:disable-next-line:variable-name
  constructor(private _config: NgbCarouselConfig, private _httpService: HttpService) {
    _config.interval = 2000;
    _config.keyboard = true;
    _config.pauseOnHover = true;
    this.reader = new FileReader();
  }

  ngOnInit(): void {
    this._httpService.getRatesForBaseCurrency();
  }
  // tslint:disable-next-line:typedef
  chooseFile(event: MouseEvent) {
    // @ts-ignore
      document.getElementById('getFile').click();
  }
  // tslint:disable-next-line:typedef
  changeImage(event: Event) {
    const carouselItems = document.querySelectorAll('div.active');
    // @ts-ignore
    const slideTextContent = (carouselItems[0].textContent).split(' ');
    const indexToSwap = Number(slideTextContent[this.SLIDE_NUMBER]) - 1;
    // @ts-ignore
    const image = (event.target.files[0].name).toString();
    const url = ('../../../assets/' + image);
    this.urls[indexToSwap] = url;
  }
}
