import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dona-graphics',
  templateUrl: './dona-graphics.component.html',
  styleUrls: ['./dona-graphics.component.scss']
})
export class DonaGraphicsComponent implements OnInit {

  @Input() chartLabels;
  @Input() chartData: ChartDataset[];
  @Input() chartType: ChartType;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
