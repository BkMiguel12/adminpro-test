import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';


const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Ajustes del tema'} },
            { path: 'progress', component: ProgressComponent, data: {title: 'Progresos'} },
            { path: 'graphics1', component: Graphics1Component, data: {title: 'Gráficas'} },
            { path: 'promises', component: PromisesComponent, data: {title: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: {title: 'RxJs - Observables'} },
            { path: 'profile', component: ProfileComponent, data: {title: 'Perfil de Usuario'} },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(pagesRoutes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
