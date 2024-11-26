import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categorys: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  selectedCategory: string = this.categorys[0];
  articles:Article[] = [];


  constructor(private newsService: NewsService) {}


  ngOnInit(): void {
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe(articles =>{ 
        this.articles = [...this.articles, ...articles];
    });
  }

  segmentChanged(event:any){
    this.selectedCategory = event.detail.value;
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe(articles =>{ 
        this.articles = [...articles];
    });
  }

}
