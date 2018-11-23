import { Component, NgModule, OnInit } from '@angular/core';
import { ParametersService } from './services/parameters.service';
import { TranslateService } from './services/translate.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@NgModule({
  imports: []
})
export class AppComponent implements OnInit {
  title = 'app';
  showBanner = false;
  deferredPrompt: any;

  constructor(
    private parameterService: ParametersService,
    private translate: TranslateService,
    private swUpdate: SwUpdate
  ) {
    let params = {
      titel: 'ding',
      private: true
    };
    let url = this.parameterService.generateGetUrl('http://test.be', params);

    translate.use('en');
  }

  ngOnInit() {
    this.swUpdate.available.subscribe((evt) => {
      console.log('evt', evt);
      if (confirm('De website is aangepast. Wil je de nieuwe versie openen?')) {
        window.location.reload();
      }
    });
    window.addEventListener('beforeinstallprompt', (evt) => {
      console.log('beforeinstallprompt', evt);
      // Voorkomen dat Chrome 67 of eerder de "native" prompt toont
      evt.preventDefault();
      // Bewaar het event zodat je dit later kan activeren
      this.deferredPrompt = evt;
      // Update de UI om aan te geven dat de app kan worden geïnstalleerd
      this.showBanner = true;
      console.log('this.showBanner', this.showBanner);
    });
  }

  addToHomescreen() {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult) => {
      console.log('choiceResult', choiceResult);
      if (choiceResult.outcome === 'accepted') {
        alert('User accepted the prompt');
      } else {
        alert('User dismissed the prompt');
      }
      this.deferredPrompt = null;
      this.showBanner = false;
    });
  }
}
