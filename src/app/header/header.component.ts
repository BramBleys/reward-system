import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {}

  changeLanguage(language: string) {
    switch (language) {
      case 'en':
        this.translate.use('en');
        break;
      case 'nl':
        this.translate.use('nl');
        break;
    }
  }
}
