/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Home } from './home';
import { RouterActive } from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.css')
  ],
  template: `
    <md-content>
      <md-toolbar color="primary">
          <span>{{ name }}</span>
          <span class="fill"></span>
          <button md-button router-active [routerLink]=" ['Index'] ">
            Shopping-List
          </button>
          <button md-button router-active [routerLink]=" ['About'] ">
            About
          </button>
      </md-toolbar>

      <div [hidden]="!loading">
      <md-progress-bar mode="indeterminate" color="primary" ></md-progress-bar>
      </div>

      <router-outlet></router-outlet>

      </md-content>
  `
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./about')('About') }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = true;
  name = 'Devshop by Igor Fischer';
  url = 'https://devshop-ng2.igor-fischer.rocks';

  constructor(
    public appState: AppState
  ) {
      const unsubscribe = this.appState.store.subscribe(() => {
        this.loading = this.appState.store.getState().loading;
      });
  }

  ngOnInit() {
    this.appState.actions.componentOnline();
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
