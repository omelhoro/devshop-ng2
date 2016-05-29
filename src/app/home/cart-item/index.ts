import { Component, Inject, Input } from '@angular/core';

import { AppState } from '../../app.service';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'newDate' })
export class NewDate implements PipeTransform {
  transform(str: string) {
    return new Date(str);
  }
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'cart-item',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
  ],
  inputs: [
    'dev',
    'canOrder',
  ],

  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ NewDate ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [
    `
    .something .md-list-item {
      border: 1px solid grey;
      margin: 20px
    }
    .button-remove {
      float: right;
    }
    `,
  ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  <md-list-item class="something">
    <img md-list-avatar src={{dev.avatar_url}} alt={{dev.login}}>
    <h3 md-line> {{dev.login}} </h3>
    <p md-line>
      <span> Price </span>
      <span class="demo-2"> -- {{dev.appAdded.totalSum | number}}$ </span>


    </p>
    <button [disabled]="!canOrder" md-mini-fab (click)="removeDev(dev)" >
    <md-icon>remove_shopping_cart</md-icon>
    </button>
  </md-list-item>
  `,
})
class LocalComponent {

  constructor(
      public appState:      AppState
    , @Inject('Actions')  private actions
  ) {

  }

  removeDev(dev) {
    this.appState.store.dispatch(this.actions.removeFromCard(dev));
  }

}

export default LocalComponent;
