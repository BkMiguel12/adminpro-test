import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public titleBread: string;

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.getDataRoute().subscribe((res) => {
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

  ngOnInit() {
  }

  getDataRoute():Observable<string> {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map(event => event.snapshot.data.title)
      )
  }

}
