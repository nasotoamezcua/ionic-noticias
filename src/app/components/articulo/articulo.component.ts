import { Component, Input } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { Platform } from '@ionic/angular';

//plugin
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent{

  @Input() article!: Article;
  @Input() index!: number;

  constructor(private iab: InAppBrowser, private platform: Platform ) { }
  

  onClick(){

  }

  openArticle(){

    if(this.platform.is('android') || this.platform.is('ios')) {
      const broser = this.iab.create(this.article.url);
      broser.show();
      return;
    }
   
    window.open(this.article.url, '_blank')

  }

  

}
