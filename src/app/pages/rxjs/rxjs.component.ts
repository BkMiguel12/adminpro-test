import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public subscription: Subscription;

  constructor() {
    this.subscription = this.returnObs().subscribe(
      res => console.log('Contador:', res),
      err => console.log('Error', err),
      () => console.log('Termino el observer')
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Destruido');
    this.subscription.unsubscribe();
  }

  returnObs(): Observable<any> {
    return new Observable((observer: Subscriber<any>)=> {
      let contador = 0;

      let interval = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        }

        observer.next(salida);

        // if(contador === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }
      }, 1000);
    }).pipe(
      map(res => res.valor),
      filter((val, idx) => {
        if((val % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false
        }
      })
    );
  }

}
