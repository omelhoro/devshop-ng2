import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';
import {bindActionCreators} from 'redux';
const store = require('./redux/configureStore').default;
const actions = require('./redux/index');

@Injectable()
export class AppState {
  // @HmrState() is used by HMR to track the state of any object during a hot module replacement
  @HmrState() store;
  actions;

  constructor() {
    this.store = store();
    this.actions = bindActionCreators(actions, this.store.dispatch);
  }

  // already return a clone of the current state
  get state() {
    return this.store.getState();
    // return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state[prop] || state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    // return this._state[prop] = value;
  }

  _clone(object) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
