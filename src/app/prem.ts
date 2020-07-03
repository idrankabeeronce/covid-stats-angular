import { Injectable } from '@angular/core';
import * as data from 'src/app/df.json';

class item {
confirmed: number;
country: string;
cured: number;
death_per: number;
deaths: number;
num: number;
}
    @Injectable()

    export class ParamsModel {
        constructor(public params:ParamsModel) { }
        items: any = (data as any).default;
        chosenitmf: item = this.items[0];
        chosenitms: item = this.items[1];
        

        public setParams(param) {
            this.chosenitmf = param;
        }

        public getParams() {
            return this.chosenitmf;
        }
    }