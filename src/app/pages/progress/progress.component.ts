import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  public percentage1: number = 35;
  public percentage2: number = 60;

  constructor() { }

  ngOnInit() {
  }

  updateBar(event: number) {
    console.log(event);
  }

}
