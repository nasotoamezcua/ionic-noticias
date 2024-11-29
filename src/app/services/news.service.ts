import { ArticlesByCategoryAndPage} from './../interfaces/index';
import { NewsResponse, Article } from './../interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {}

  constructor(private http: HttpClient) { }

  private executeQuery<T>( endpoint: string) {
    console.log('Petiicon Http realizada');
    
    return this.http.get<T>(`${apiUrl}${endpoint}` , {
      params:{
        apiKey:apiKey,
        country:'us'
      }
    });
  }

  getTopheadlines() : Observable<Article[]>{

    return this.getTopHeadLinesByCategory('business')

     /*
    return this.executeQuery<NewsResponse>(`/top-headlines?category=business`)
      .pipe( map( ({articles}) => articles ) 
    );
     
    return this.http.get<NewsResponse>(`/top-headlines?category=business`, {
      params: { apiKey: apiKey }
    }).pipe(
      //map( resp => resp.articles)
      map( ({articles}) => articles )
    );
    */
  }

  getTopHeadLinesByCategory( category: string, loadMore: boolean = false ): Observable<Article[]>{

    //Si quiere cargar mas articulos ::: loadMore = true
    if(loadMore){
      return this.getArticlesByCategory(category);
    }

    //Si existe la categoria, regresa sus articulos
    if(this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles); //of construye un observable basado en el argumento o respuesta que se tiene
    }

    //Si no existe a un la categoria
    return this.getArticlesByCategory(category);
    

    /*
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${ category }`, {
      params: { apiKey: apiKey }
    }).pipe(
      //map( resp => resp.articles)
      map( ({articles}) => articles )
    );
    */
 }

 getArticlesByCategory(category: string) : Observable<Article[]> {

  //console.log(Object.keys(this.articlesByCategoryAndPage));

  //Si ya ecxiste la categoria seleccionada
  if(Object.keys(this.articlesByCategoryAndPage).includes(category) ){
    //this.articlesByCategoryAndPage[category].page +=1
  }else{
    //Si No Existe la acategoria seleccionada, se inicia los valores del objeto articlesByCategoryAndPage
    this.articlesByCategoryAndPage[category] = {
      page:0,
      articles:[]
    }
  }

  const page = this.articlesByCategoryAndPage[category].page +1 ;

  return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${page}`)
    .pipe(
      //map( resp => resp.articles)
      map( ({articles}) => {

        //Solo entra aqui si la categoria no existe
        if(articles.length === 0) return this.articlesByCategoryAndPage[category].articles; //this.articlesByCategoryAndPage[category].articles = articles; 

        //Solo se ejecuta este codigo si se desean cargar mas notcias de una categoria especifica
        this.articlesByCategoryAndPage[category] = {
          page:page,
          articles: [...this.articlesByCategoryAndPage[category].articles, ...articles] //Muestra articulos anteriores y añade al final los nuevos artiulos
        }

        return this.articlesByCategoryAndPage[category].articles;

      })
    );

 }
 
}
