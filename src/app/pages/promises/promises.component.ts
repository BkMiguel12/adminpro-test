import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.scss']
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.countThree().then(() => console.log('Termino'))
    .catch(err => console.log('Hubo un error', err));
  }

  ngOnInit() {
  }

  countThree() {
    return new Promise((resolve, reject) => {
      let contador = 0;

      let interval = setInterval(() => {
        contador += 1;
        console.log(contador);

        if(contador === 3) {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
