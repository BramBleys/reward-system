import { Component, NgModule } from '@angular/core';
import { ParametersService } from './services/parameters.service';
import { TranslateService } from './services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@NgModule({
  imports:[]
})
export class AppComponent {
  title = 'app';

  constructor(private parameterService: ParametersService, private translate: TranslateService){
    let params = {
      titel: 'ding',
      private: true

    };
    let url = this.parameterService.generateGetUrl("http://test.be",params);
    console.log(url) //Output: http://test.be?titel=dingprivate=true

    translate.use('en');
  }
}


