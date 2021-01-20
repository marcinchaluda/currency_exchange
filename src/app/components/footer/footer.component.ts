import { Component, OnInit } from '@angular/core';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  copyrights = faCopyright;
  fbIcon = faFacebookF;
  gitHubIcon = faGithub;
  mailIcon = faEnvelope;
  latestApiUpdate = this._httpService._latestApiUpdate$;
  currencyRates = this._httpService._latestRates$;
  // tslint:disable-next-line:variable-name
  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getRatesForBaseCurrency();
  }
}
