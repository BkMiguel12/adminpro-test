import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona-graphics',
  templateUrl: './dona-graphics.component.html',
  styleUrls: ['./dona-graphics.component.scss']
})
export class DonaGraphicsComponent implements OnInit {

  @Input() chartLabels: Label[];
  @Input() chartData: SingleDataSet[];
  @Input() chartType: ChartType;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
