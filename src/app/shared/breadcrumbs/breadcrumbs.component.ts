import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnDestroy {

  public titleBread: string;
  public titleSub$: Subscription;

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.titleSub$ = this.getDataRoute().subscribe((res) => {
      console.log(res);
      this.titleBread = res;
      this.title.setTitle(this.titleBread);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: 'Esta es la pagina ' + this.titleBread
      }
      this.meta.updateTag(metaTag);
    });
  }

  getDataRoute():Observable<string> {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map(event => event.snapshot.data.title)
      )
  }

  ngOnDestroy() {
    this.titleSub$.unsubscribe();
  }

}
