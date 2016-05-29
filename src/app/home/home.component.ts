import { Component, Inject } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';

import { Pipe, PipeTransform } from '@angular/core';

import DevComponent from './dev-item';
import CartItem from './cart-item';

import {shoppingList} from '../redux/initState';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    XLarge,
    DevComponent,
    CartItem,
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./home.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.html'),
})
export class Home {
  // Set our default values
  localState = shoppingList;

  buffer = {
    lastUserSearch: '',
    lastOrgSearch: '',
    email: '',
    coupon: '',
  };


  // TypeScript public modifiers
  constructor(
      public appState:      AppState
    , public title:       Title
  ) {
    const unsubscribe = this.appState.store.subscribe(() => {
      const state = this.appState.state;
      this.localState = state;
    });
  }

  onInput(dev, event) {
    this.appState.actions.calculatePrice(dev, event);
  }

  ngOnInit() {
    console.log('I\'m online');
    this.appState.actions.componentOnline();
  }

  validateCoupon(value) {
    this.appState.actions.useCoupon({target: {value}});
  }

  goToConfirmOrder() {
    this.appState.actions.changeStage('confirm');
  }

  confirmOrder() {
    this.appState.actions
      .sendOrder(this.buffer.email);
 }

  resetCart() {
    this.localState
      .shoppingcard
      .forEach(this.appState.actions.removeFromCard);
  }

  startFromScratch() {
    this.appState.actions.endOrdering();
  }

  revertConfirm() {
    this.appState.actions.changeStage('choosing');
  }

  importUser(value) {
    this.appState.actions.addHistoryUser(value);
    this.appState.actions.addDevFromName(value);
  }

  importOrg(value) {
    this.appState.actions.addHistoryOrg(value);
    this.appState.actions.addDevFromOrg(value);
  }

}
