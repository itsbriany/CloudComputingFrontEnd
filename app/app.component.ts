import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {Component} from 'angular2/core';
import {MbrComponent} from "./mbr.component";
import {HTTP_PROVIDERS} from "angular2/http";
import {MbrService} from "./services/mbr-service";
import {StatusComponent} from "./status.component";

@RouteConfig([
    {
        path: '/application',
        name: 'MortgageApplication',
        component: MbrComponent,
        useAsDefault: true
    },
    {
        path: '/status',
        name: 'Status',
        component: StatusComponent
    },
])
@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['MortgageApplication']">Apply for mortgage</a>
            <a [routerLink]="['Status']">Check your mortgage status</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        MbrService
    ]
})
export class AppComponent {
    title = 'Assignment 5';
}
