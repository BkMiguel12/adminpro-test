import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styleUrls: ['./graphics1.component.scss']
})
export class Graphics1Component implements OnInit {

  public chartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public chartData: any[] = [[350, 450, 100]];
  public chartType: string = 'doughnut';

  public charts: any = [
    {
      'labels': ['Frijoles', 'Natilla', 'Tocino'],
      'data': [[24, 30, 46]],
      'type': 'doughnut',
      'title': 'El pan se come con'
    },
    {
      'labels': ['Hombres', 'Mujeres'],
      'data': [[4500, 6000]],
      'type': 'doughnut',
      'title': 'Entrevistados'
    },
    {
      'labels': ['Si', 'No'],
      'data': [[95, 5]],
      'type': 'doughnut',
      'title': '¿Le dan gases los frijoles?'
    },
    {
      'labels': ['No', 'Si'],
      'data': [[85, 15]],
      'type': 'doughnut',
      'title': '¿Le importa que le den gases?'
    }
  ];

  constructor() {

  }

  ngOnInit() {
  }

}
