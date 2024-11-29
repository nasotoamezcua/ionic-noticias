import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static:true}) infiniteScroll!: IonInfiniteScroll; // La propiedad static:true inicializa el componente antes de que se cargue la pagina

  categorys: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  selectedCategory: string = this.categorys[0];
  articles:Article[] = [];


  constructor(private newsService: NewsService) {}


  ngOnInit(): void {
    console.log(this.infiniteScroll);
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe(articles =>{ 
        this.articles = [...articles];
    });
  }

  segmentChanged(event:Event){
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe(articles =>{ 
        this.articles = [...articles];
    });
  }

  loadData() {
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory, true)
    .subscribe(articles => {

      if(articles.length === this.articles.length){
        this.infiniteScroll.disabled = true;
        //(event as InfiniteScrollCustomEvent).target.disabled = true;
        return;
      }
      this.articles = articles;
      setTimeout(() => {
        this.infiniteScroll.complete();
        //(event as InfiniteScrollCustomEvent).target.complete();
      }, 500);
    });
  }

}
