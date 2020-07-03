import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ParamsModelService } from 'src/app/params-model.service';
import * as data from 'src/app/df.json';
import * as data_r from 'src/app/df_r.json';
import Scrollbar from 'smooth-scrollbar';



class item {
    confirmed: number;
    country: string;
    cured: number;
    death_per: number;
    deaths: number;
    num: number;
}


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
    selectedCountry: any;
    selectedRow : Number;
    setClickedRow : Function;
    scrollbarM: any;
    hrel: any;
    ngAfterViewInit() {
        
        Scrollbar.init(document.querySelector('#my-scrollbar'));
        this.scrollbarM = Scrollbar.init(document.querySelector('#main-content-scrollbar'));
        this.hrel = document.getElementById('graphs');
    }
    constructor(public params:ParamsModelService) {
    };
  
    displayedColumns: string[] = ['num', 'country', 'confirmed', 'deaths', 'cured', 'death_per'];

    items: any = (data as any).default;
    items_w = this.items;
    chosenitem: item[] = this.items[0];
    
    sortData(sort: Sort) {
        console.log("sortData");
        const s_data = this.items.slice();
        if (!sort.active || sort.direction === '') {
            this.items = s_data;
            return;
        }

        this.items_w = s_data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'num': return compare(a.num, b.num, isAsc);
                case 'country': return compare(a.country, b.country, isAsc);
                case 'confirmed': return compare(a.confirmed, b.confirmed, isAsc);
                case 'deaths': return compare(a.deaths, b.deaths, isAsc);
                case 'cured': return compare(a.cured, b.cured, isAsc);
                case 'death_per': return compare(a.death_per, b.death_per, isAsc);
                default: return 0;
            }
        });
    }
    switchtor():void {
        console.log("switchtor");
        this.items = (data_r as any).default;
        this.items_w = this.items;
        this.chosenitem = this.items[0];
        this.params.setParams(this.chosenitem);
    }
    switchtow():void{
        console.log("stirchtow");
        this.items = (data as any).default;
        this.items_w = this.items;
        this.chosenitem = this.items[0];
        this.params.setParams(this.chosenitem);
    }
    update() {
        console.log("update");
        if (this.selectedCountry != '') {
            this.items_w = [];
            for (let dat of this.items) {
                let cont = dat.country
                if (cont.match(this.selectedCountry)) { this.items_w.push(dat)}
            } 
        } else { this.items_w = []; this.items_w = this.items}
    }
    scroll () {
        
        this.scrollbarM.scrollIntoView(this.hrel);
    }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
    console.log("update");
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
