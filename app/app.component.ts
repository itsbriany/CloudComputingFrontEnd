import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {Component} from 'angular2/core';
import {MbrComponent} from "./mbr.component";

@RouteConfig([
    {
        path: '/mbr',
        name: 'MBR',
        component: MbrComponent,
        useAsDefault: true
    }
])
@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})
export class AppComponent {
    title = 'Assignment 5';
}
