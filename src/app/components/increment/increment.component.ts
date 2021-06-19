import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.scss']
})
export class IncrementComponent implements OnInit {

  @Input() percentage: number = 50;
  @Input() title: string = 'Incrementador'
  @Input() btnClass: string = 'btn-outline-info';

  @Output() emitChangeValue: EventEmitter<number> = new EventEmitter;

  @ViewChild('perInput', { static: false }) perInput: ElementRef;

  constructor() { }

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`
  }

  onChange(value) {
    if (value >= 100) {
      this.percentage = 100;
    } else if (value <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = value;
    }

    this.perInput.nativeElement.value = this.percentage;
    this.emitChangeValue.emit(this.percentage);
  }

  changeValue(value: number) {
    if ((this.percentage < 100 && value > 0) || (this.percentage > 0 && value < 0)) {
      this.percentage = this.percentage + value;
      this.emitChangeValue.emit(this.percentage);
      this.perInput.nativeElement.focus();
    } else {
      return;
    }
  }

}
