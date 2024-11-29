import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static:true}) infiniteScroll!: IonInfiniteScroll;

  public articles:Article[] = [];

  constructor(private newsService: NewsService) {}

  
  ngOnInit(): void {
   
    
    this.newsService.getTopheadlines()
     //.subscribe(articles => { this.articles = [... articles, ... this.articles];
      .subscribe( articles =>{ this.articles.push(...articles)
      });
    

      //console.log (this.articles);
  }

  loadData(){

    this.newsService.getTopHeadLinesByCategory('business', true)
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
