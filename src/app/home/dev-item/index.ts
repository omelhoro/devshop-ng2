import { Component, Inject, Input } from '@angular/core';

import { AppState } from '../../app.service';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'newDate' })
export class NewDate implements PipeTransform {
  transform(str: string) {
    return new Date(str);
  }
}


@Pipe({ name: 'shorten' })
export class Shorten implements PipeTransform {
  transform(str: string) {
    if (str && str.length > 20) {
      return str.slice(0, 20) + '...';
    } else {
      return str;
    }
  }
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'dev-item',  // <home></home>
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
  pipes: [ NewDate, Shorten ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [
    `
      .hours-price {
        padding-right: 10px;
      }
      .total-price {
        padding-left: 10px;
      }

      .dev-item {
        margin-bottom: 10px;
        width: 320px;
      }

      .interact-buttons {
        width: 49%;
      }

    `,
  ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  <md-card class="dev-item">
    <md-card-header>
       <img md-card-avatar src={{dev.avatar_url}} >
       <md-card-title>{{dev.login}}</md-card-title>
       <md-card-subtitle>Company: {{dev.company | shorten}}</md-card-subtitle>
    </md-card-header>

    <md-card-content>
      <md-card-subtitle>{{dev.followers}} Followers</md-card-subtitle>
      <md-card-subtitle>{{dev.public_repos}} Public Repos</md-card-subtitle>
      <md-card-subtitle>{{dev.public_gists}} Public Gists</md-card-subtitle>
      <md-card-subtitle>Since {{dev.created_at | newDate | date: 'YYYY' }} at GitHub
        </md-card-subtitle>
      <md-card-subtitle>{{dev.email}} </md-card-subtitle>
      <md-input [disabled]="dev.isInCard" [value]="dev.appAdded.orderedHours || ''"
        placeholder="amount of hours" (change)="onInput(dev, $event)" align="end">
        <span class="hours-price" md-prefix>{{dev.appAdded.price}}$/Hour  </span>
        <span class="total-price" md-suffix> = {{dev.appAdded.totalSum | number}}$</span>
      </md-input>
      <md-card-subtitle>
        <button md-raised-button class="interact-buttons"
          [disabled]="dev.isInCard || !dev.appAdded.totalSum || !canOrder"
          (click)="addDev(dev)" color="primary">Add to cart</button>
        <button md-raised-button [disabled]="!dev.isInCard || !canOrder"
        (click)="removeDev(dev)" class="interact-buttons" color="warn">Remove from cart</button>
      </md-card-subtitle>
    </md-card-content>
  </md-card>
  `
})
export class LocalComponent {

  constructor(
      public appState:      AppState
    , @Inject('Actions')  private actions
  ) {

  }

  onInput(dev, event) {
    this.appState.store.dispatch(this.actions.calculatePrice(dev, event));
  }

  addDev(dev) {
    this.appState.store.dispatch(this.actions.addToCard(dev));
  }

  removeDev(dev) {
    this.appState.store.dispatch(this.actions.removeFromCard(dev));
  }


}

export default LocalComponent;
