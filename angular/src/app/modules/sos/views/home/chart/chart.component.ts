import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatSort, MatTableDataSource, MatSortable, MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/modules/sos/shared/services/global/global.service';
import { UTILSService } from 'src/app/modules/sos/shared/services/utils/utils.service';
import { ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { animate, state, transition} from "@angular/animations";
import { trigger} from "@angular/animations";
import { style} from "@angular/animations";
import { Input} from "@angular/core";
import { ChartsService } from "src/app/modules/sos/shared/services/charts/charts.service";
import * as Chart from "chart.js";
import { _switch} from "rxjs-compat/operator/switch";

@Component({
  selector: 'app-home-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartHomeComponent implements OnChanges, OnInit {

  @Input() markChart: string;
  @Input() timeChart: string;

  @Output()
  totalRecords: EventEmitter<string> = new EventEmitter<string>();

  public pieChartLabels:string[] = ["Pending", "InProgress", "OnHold", "Complete", "Cancelled","Nueva"];
  public pieChartLegend:boolean = true;
  public pieChartData:number[] = [21, 39, 10, 14, 16, 33];
  public pieChartType:string = 'doughnut';
  public pieChartColors:Array<any> = [];
  public pieChartOptions:any = {'backgroundColor': [
    "#FF6384",
    "#4BC0C0",
    "#FFCE56",
    "#E7E9ED",
    "#36A2EB",
    "#800000"
    ]}

  public lineChartData:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartLabels:Array<any> = [];
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(248,185,72,0.5)',
      borderColor: '#363636',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#ff8600',
      pointHoverBorderColor: '#FFF'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  chartReady: boolean = false;

  constructor(private router: Router, public dialog: MatDialog,
              private http: HttpClient,
              public activatedRoute: ActivatedRoute,
              private globalService: GlobalService,
              private chartService: ChartsService,
              private UTILS: UTILSService,
              private snackBar: MatSnackBar) {

    this.lineChartLabels = [];
    this.lineChartData = [];

  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.createChart();
  }

  // events
  public chartClicked(e:any):void {
    // console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }

  createChart(): void {

    this.chartReady = false;
    this.lineChartLabels = [];
    this.lineChartData = [];

    this.chartService.get(this.markChart, this.timeChart).toPromise().then((records: Array<any>)=>{

      const dataCompleted = {
        'data': [],
        'label': 'Records'
      };

      records.forEach((record, idx, array) => {
        let extraLabel = this.extraLabel(this.timeChart);
        this.lineChartLabels.push(record.key.toString().padStart(2, '0') + extraLabel); //LABELS
        dataCompleted.data.push(record.total);  //DATA

        if (idx === array.length - 1){
          this.lineChartData.push(dataCompleted);
          this.chartReady = true;
          this.totalRecords.emit(this.totalRecordsData());
        }
      });
    });
  }

  extraLabel(time: string): string {

    let label;

    switch(time) {
      case "d": {
        label = ":00";
        break;
      }
      case "w": {
        label = "";
        break;
      }
      case "m": {
        label = "";
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    return label;
  }

  public totalRecordsData(): string {
    let total=0;
    this.lineChartData[0].data.forEach((record)=>{
      total = total + record;
    });
    return total.toString();
  }
 
}
