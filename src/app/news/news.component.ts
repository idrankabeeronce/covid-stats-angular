import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Scrollbar from 'smooth-scrollbar';
import * as data from 'src/app/news/news.json';
//let card = document.getElementsByClassName("news-card");
import * as data_stat_W from 'src/app/df.json'
import * as data_stat_R from 'src/app/df_r.json'
let scrollbarnews: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  constructor(private http: HttpClient) {
  
   }
  world_sum_cured : number = 0;
  world_sum_deaths: number = 0;
  world_sum_confirmed: number = 0;
  world_per_deaths: number = 0;
  world_per_cured: number = 0;
  russia_sum_cured: number = 0;
  russia_sum_deaths: number = 0;
  russia_sum_confirmed: number = 0;
  russia_per_deaths: number = 0;
  russia_per_cured: number = 0;
  world_items: any = (data_stat_W as any).default;
  russia_items: any = (data_stat_R as any).default;

  textNews: string = "";
  car: any;
  isCurrent: boolean = false;
  isOpened: boolean = false;
  items: any = (data as any).default;
  selectedNews: any = this.items[0];
  scroll: any;
  dataArray: any = [];
  arrayOfValute: any = {
    EUR : 0,
    USD : 0
  };
  
  ngAfterViewInit() {
    Scrollbar.init(document.querySelector('#my-news-scrollbar'));  
    scrollbarnews = Scrollbar.init(document.querySelector('#c-scrollbar'));
    let card = document.querySelectorAll(".news-card")
    let change_button = document.querySelectorAll(".material-icons");
    let open_button = document.querySelectorAll("#open-side-content");
    let side_menu = document.querySelector(".side-statistics-container");

    
    
    

    open_button.forEach(element => {
      element.addEventListener('click', () => {
        if (this.isOpened) {
          side_menu.setAttribute("style", "width: 0%");
          this.isOpened = false;
        } else {side_menu.setAttribute("style", "width: 10%"); this.isOpened = true;}
      })
    })
    card.forEach(element => {
      element.addEventListener('click', () => {
        for (let item of this.items){
          if (element.getAttribute("title") == item.title) {
            this.selectedNews = item;
            this.http.get(this.selectedNews.text, { responseType: 'text' }).subscribe(dat=> {this.textNews = dat});
            this.isCurrent = true;
          }
        }        
      })
    });
    change_button.forEach(element => {
      element.addEventListener('click', () =>  {
        if (element.getAttribute("id") == "forward-but" ){
          for ( let [index, item] of this.items.entries()) {
            if (item.title === this.selectedNews.title) {
              if (index === (this.items.length - 1)) {
                this.selectedNews = this.items[0];  
              } else {   
                this.selectedNews = this.items[index +1];
              }
              this.http.get(this.selectedNews.text, { responseType: 'text' }).subscribe(dat=> {this.textNews = dat});
              scrollbarnews.scrollTo(0, 0);
              break;
            }                
          };
        }
        if (element.getAttribute("id") == "backward-but" ){
          for ( let [index, item] of this.items.entries()) {
            if (item.title === this.selectedNews.title) {
              if (index == 0) {
                this.selectedNews = this.items[this.items.length-1]
              } else { 
                this.selectedNews = this.items[index-1] 
              }
              this.http.get(this.selectedNews.text, { responseType: 'text' }).subscribe(dat=> {this.textNews = dat});
              scrollbarnews.scrollTo(0, 0);
              break;
            }
          }
        }
      })
        
    });
  }
  
  ngOnInit(): void {
    
    this.http.get("https://www.cbr-xml-daily.ru/daily_json.js").subscribe(data => { this.dataArray = data; this.arrayOfValute.USD = this.dataArray.Valute.USD.Previous; this.arrayOfValute.EUR = this.dataArray.Valute.EUR.Previous;});
    for (let [index, item] of this.world_items.entries()) {
      this.world_sum_confirmed += item.confirmed;
      this.world_sum_deaths += item.deaths;
      this.world_sum_cured += item.cured;
    }
    for (let [index, item] of this.russia_items.entries()) {
      this.russia_sum_confirmed += item.confirmed;
      this.russia_sum_deaths += item.deaths;
      this.russia_sum_cured += item.cured;
    }
    this.world_per_deaths = Number((this.world_sum_deaths/this.world_sum_confirmed).toFixed(2));
    this.world_per_cured = Number((this.world_sum_cured/this.world_sum_confirmed).toFixed(2));
    this.russia_per_cured = Number((this.russia_sum_cured/this.russia_sum_confirmed).toFixed(2));
    this.russia_per_deaths = Number((this.russia_sum_deaths/this.russia_sum_confirmed).toFixed(2));
    
  }
  calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }
  calculateDiffDate(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    return (dateSent.toLocaleDateString());
  }

}
