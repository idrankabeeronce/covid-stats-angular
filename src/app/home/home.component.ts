import { Component,DoCheck, OnInit } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import * as prevention from 'src/app/home/prevention.json'
import { scrollTo, scrollIntoView, } from 'smooth-scrollbar/scrolling/';
let scrollbarZ: any;
let preventionH: any;
let hrzel: any;
let targetel: any;
let clicked: boolean = false;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: any = (prevention as any).default;
  currentPrevention: string = "";
  constructor() { 
  }
  
  observer:any = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
      if (!clicked){
          if (scrollbarZ.offset.y >= hrzel[0].offsetTop) 
          {
              if (scrollbarZ.offset.y >= (hrzel[1].offsetTop-200)) 
            {
                if (scrollbarZ.offset.y >= (hrzel[2].offsetTop-200)) 
              {
                targetel.setAttribute("id","");
                preventionH[2].setAttribute("id","target");
                targetel = preventionH[2];
                return;
              }
              targetel.setAttribute("id","");
              preventionH[1].setAttribute("id","target")
              targetel = preventionH[1];
              return;
            }
            targetel.setAttribute("id","");
            preventionH[0].setAttribute("id","target")
            targetel = preventionH[0];
            return;
          }
        }
        
      });   
  });

  ngAfterViewInit() { 
    hrzel = document.querySelectorAll('.hidden-hr');
    scrollbarZ = Scrollbar.init(document.querySelector('#my-home-scrollbar'));  
    let prevention_card = document.querySelectorAll('.prevention-card');
    let popup = document.querySelector('.popup-prevention');
    prevention_card.forEach(element => {
      element.addEventListener('mouseover', () => {
        let res:string = "visibility:visible; opacity: 1";
        switch (element.getAttribute("id")) {
          case "1": 
            popup.setAttribute("style","left: 0; top: 210px;width: 60%;" + res)
            break;
          case "2": 
            popup.setAttribute("style","left: 45%; top: 0;" + res)
            break;
          case "3":
            popup.setAttribute("style","right: 19%; top: 210px;" + res) 
            break;
          case "4": 
            popup.setAttribute("style","left: 20%; top: 210px;" + res)
            break;
          case "5": 
            popup.setAttribute("style","left: 20%; bottom: 210px;" + res)
            break;
          case "6": 
            popup.setAttribute("style","right: 0; bottom: 210px; width: 100%;" + res)
            break;
        }
        for (let item of this.items) {
          if (item.id == element.getAttribute("id"))
            this.currentPrevention = item.text; 
        }
      });
      element.addEventListener('mouseout', () => {
        popup.setAttribute("style","visibility:hidden; opacity: 0; transition: 0s");
      })
    })
    preventionH = document.querySelectorAll('.nav-cont');
    preventionH.forEach(element => {
      if (element.getAttribute("id") == "target") {
        targetel = element;
      }
      element.addEventListener('click', ()=> {
        clicked = true;
        scrollbarZ.scrollIntoView(document.getElementById(element.getAttribute('data-href')));
        targetel.setAttribute("id","");
        element.setAttribute("id", "target");
        targetel = element;
        setTimeout(()=> {clicked = false}, 1700);
      })
    })
    

    let target = document.querySelector('#my-home-scrollbar .scroll-content');
    this.observer.observe(target, { attributes : true, attributeFilter : ['style'] });
  }
  ngOnInit(): void {
    
  }
  
}
