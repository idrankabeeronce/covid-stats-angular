import { Component,OnInit,Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SimpleChanges } from '@angular/core';
import { ParamsModelService } from 'src/app/params-model.service';

import * as data from 'src/app/ddf_russia.json';
import * as data_w from 'src/app/ddf_world.json';
import * as data_lw from 'src/app/df.json';
import * as data_lr from 'src/app/df_r.json';
let dataArray: any;

Highcharts.setOptions({
    colors: ['#058DC7', '#50B432', '#ED561B']
});


@Component({
  selector: 'app-out-graph',
  templateUrl: './out-graph.component.html',
  styleUrls: ['./out-graph.component.css']
})
export class OutGraphComponent  {   
    comp_colorConf: string = '#058DC7';
    comp_colorCured: string = '#50B432';
    comp_colorDeaths: string = '#ED561B';

    line_colorConf: string = '#058DC7';
    line_colorCured: string = '#50B432';
    line_colorDeaths: string = '#ED561B';

    selectedType: string = 'line';
    compare_data: any;
    selectedValue: string;
    selectedpoint: any = null;
    backupchart: any;
    linechart: any;
    comparechart: any;
    isInit: boolean = false;
    isDestroyed: boolean = false;
    isButton: boolean = false;
    @Input() parentData: any;
    items_w: any = (data_lw as any).default;
    items_r: any = (data_lr as any).default;

    line_options: any = {
        chart: {
            type: this.selectedType,
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer'
            }
        },
        subtitle: {
            text: 'Статистика с 28.04.2020 по 28.05.2020'
        },
        yAxis: {
            title: {
                text: "Количество"
            }
        },
        xAxis: {
            labels: {
                enabled: false
            }
        },
        series: [{
                data: 0
            },
            {
                data: 0
            },
            {
                data: 0
            }
        ],
        credits: {
            enabled: false
        },
    };
    column_options: any = {
        subtitle: {
            text: 'Число зараженных на момент 28.05.2020 с учетом количества выздоровевших и умерших'
        },
        chart: {
            type: 'column',
        },
        title: {
            text: "Графики сравнения"
        },
        
        yAxis: {
            title: {
                text: "Количество"
            }
        },
        xAxis: {
            categories: ['Зараженные (актуальные данные)','Выздоровевшие','Умершие'],
            showEmpty: true
        },
        series: [{
                colorByPoint: true,    
                data: 0
                
            },
            {
                name: "Выберите страну",
                colorByPoint: true,  
                data: 0,
                visible: false
            }    
        ],
        credits : {
            enabled: false
        }
    };

    constructor(public params:ParamsModelService) {
    }
    ngAfterViewInit() {
        this.comparechart = Highcharts.chart('comparecharts', this.column_options);
        
        this.linechart = Highcharts.chart('container', this.line_options);
        
        update_line(this.linechart, this.params.getParams(), true, null);
        update_column(this.comparechart, this.params.getParams(), this.compare_data);
        this.isInit = true;  
    }
    ngOnInit() {      
    }
    ngOnChanges(changes: SimpleChanges) {
        if (this.isInit) {
            if (this.parentData != null) {
                this.isButton = false;
                if (this.isDestroyed) { this.comparechart = Highcharts.chart('comparecharts', this.column_options); this.linechart = Highcharts.chart('container', this.line_options); this.isDestroyed = false }
                 this.linechart.destroy(); this.comparechart.destroy(); this.comparechart = Highcharts.chart('comparecharts', this.column_options); this.linechart = Highcharts.chart('container', this.line_options);
                update_column(this.comparechart, this.params.getParams(), this.compare_data); update_line(this.linechart, this.params.getParams(), true, null);
                this.swap_type(this.selectedType);
                this.linechart.update({ subtitle: {text: 'Статистика с 28.04.2020 по 28.05.2020'}})
            } else { if (!this.isDestroyed) {this.linechart.destroy(); this.comparechart.destroy(); this.isDestroyed = true } }
            }
    }
    updateselected() {
        this.compare_data = initselected(this.selectedValue, this.items_w, this.items_r);
        console.log(this.compare_data)
        update_column(this.comparechart, this.params.getParams(), this.compare_data);
    }
    change_data() {
        this.selectedpoint = this.linechart.getSelectedPoints();
        if (this.selectedpoint != 0) {
            if (this.isButton) {
                this.linechart.update({ subtitle: {text: 'Статистика с 28.04.2020 по 28.05.2020'}})
                update_line(this.linechart, this.params.getParams(), true, null)
                this.swap_type(this.selectedType);
                this.isButton = false;
            } else {
                let x = this.selectedpoint[0].options.name;
                this.linechart.update({ subtitle: {text: 'Статистика за ' + x}})
                update_line(this.linechart, this.params.getParams(), false, x)
                this.swap_type('column');
                this.isButton = true;
            }
            }
    }
    swap_type(type: any) {
        this.linechart.update({ chart: { type: type} });
    }
    updatecolor() {
        this.comparechart.update({colors: [this.comp_colorConf, this.comp_colorCured, this.comp_colorDeaths]});
    }
    updatecolorline() {
        this.linechart.update({colors: [this.line_colorConf, this.line_colorCured, this.line_colorDeaths]})
    }
    updateType() {
        if (!this.isButton) { this.swap_type(this.selectedType) }
    }
}

function initselected(country: string, items_1: any, items_2: any) {
    console.log(country)
    for (let dat of items_1) {
        let cont = dat.country
        console.log(cont);
        if (cont == country) { return dat }
    }
    for (let dat of items_2) {
        let cont = dat.country
        console.log(cont);
        if (cont == country) { return dat }
    }
    return null

}
function update_line(hichart: any, param: any, flag: boolean, datepoint: string) {
    
    const a = Object.values(data);
    const b = a[0];
    for (let dat of Object.values(b)) {
        let cont = Object.values(dat)[0];

        if (cont == param.country) {
            if (flag) { dataArray = dat; }
            else {
                for (let item of Object.values(dat)[1]) {
                    if (Object.values(item)[0] == datepoint) { dataArray = item }
                }
            }
        }

    };
    let c = Object.values(data_w); 
    let d = c[0];
    
    for (let dat of Object.values(d)) {
        let cont = Object.values(dat)[0];

        if (cont == param.country)
        {
            if (flag) { dataArray = dat; }
            else {
                for (let item of Object.values(dat)[1]) {
                    if (Object.values(item)[0] == datepoint) { dataArray = item }
                }
            }
        }

    };
       
    let dataconfirmed = [];
    let datadeaths = [];
    let datacured = [];
    if (flag) {
        dataArray.data.forEach(function (value) {
            dataconfirmed.push([value.date, value.confirmed]);
            datadeaths.push([value.date, value.deaths]);
            datacured.push([value.date, value.cured]);
        });
    } else {
        dataconfirmed.push([dataArray.date, dataArray.confirmed]);
        datadeaths.push([dataArray.date, dataArray.deaths]);
        datacured.push([dataArray.date, dataArray.cured]);
    }
    hichart.update({ chart: { type: 'line'} });
    hichart.title.update({ text: param.country })
    hichart.series[0].update({
        name: "Зараженные",
        data: dataconfirmed
    });
    hichart.series[1].update({
        name: "Вылечившиеся",
        data: datacured
    });
    hichart.series[2].update({
        name: "Умершие",
        data: datadeaths
    });

}
function update_column(hichart: any, param: any, secparam) {
    hichart.series[0].update({
        name: param.country,
        data: [
            {name: 'Зараженные (актуальные данные)', y: (param.confirmed - (param.deaths + param.cured))},
            {name: 'Выздоровевшие', y: param.cured},
            {name: 'Умершие', y: param.deaths}
        ]
    });
    if (secparam != null) {
        hichart.series[1].update({
            name: secparam.country,
            data: [
                
                {name: 'Зараженные (актуальные данные)', y: (secparam.confirmed - (secparam.deaths + secparam.cured))},
                {name: 'Выздоровевшие', y: secparam.cured},
                {name: 'Умершие', y: secparam.deaths}
            ],
            visible: true
        });
    } else {
        hichart.series[1].update({
            name: "Выберите страну",
            data: [0, 0, 0],
            visible: false
        }); 
    }
}