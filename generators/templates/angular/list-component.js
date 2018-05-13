/**
 * @interface <%=component%>ListComponent
 *
 * @author <%=author%> <<%=email%>>
 * @copyright ? - 2017 copyright
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {<%=component %>ActionTypes} from '?';
import {UiCoreActionTypes} from '?';
import * as from<%=component %>Mediator from '?';
import * as fromUiCoreMediator from '?';

@Component({
  selector: '?-?-list',
  templateUrl: './?-?-list.component.html',
  styleUrls: ['./?-?-list.component.css']
})
export class <%=component %>ListComponent implements OnInit, OnDestroy {
  /**
   * Usado para agrupar as execuções de **Observable** além de permitir o descarte dos mesmos
   * @type {Subscription}
   */
  private subscription: Subscription = new Subscription();

  /**
   * @constructor
   */
  constructor (
    protected ui: Store<fromUiCoreMediator.State>,
    protected business: <from<%=component %>Mediator.State>,
    protected router: Router
  ) {
    //Do simething...
  }

  ngOnInit() {
    this.list<%=component %>$ = this.business.pipe(select(<from<%=component %>Mediator.list<%=component %>State));
    this.list<%=component %>Error$ = this.business.pipe(select(<from<%=component %>Mediator.list<%=component %>ErrorState));
    this.list<%=component %>Done$ = this.business.pipe(select(<from<%=component %>Mediator.list<%=component %>DoneState));

    this.subscription.add(this.list<%=component %>$.subscribe(response => {
      if (response != null) {}
    }));

    this.subscription.add(this.list<%=component %>Error$.subscribe(response => {
      if (response != null) {
        this.ui.dispatch({type: UiCoreActionTypes.FinishIndeterminatedLoadingAction, element: '?-list-grid'});
        if (response.code === 100) {
          this.ui.dispatch({type: UiCoreActionTypes.CoreOpenDialogAction, data: {
            type: 'alert',
            title: 'Error!', titleColor: '#ffffff', titleBackgroundColor: '#d32f2f',
            mensagem: 'O Medtime não reconhece este usuário ou senha. Por favor tente novamente com seu usuário e senha.',
            label: 'Ok, entendi!'
          }});
        } else if (response.code === 200) {
          this.ui.dispatch({type: UiCoreActionTypes.CoreOpenDialogAction, data: {
            type: 'alert',
            title: 'Error!', titleColor: '#ffffff', titleBackgroundColor: '#d32f2f',
            mensagem: 'O Medtime não reconhece este usuário ou senha. Por favor tente novamente com seu usuário e senha.',
            label: 'Ok, entendi!'
          }});
        } else if (response.code === 300) {
          this.ui.dispatch({type: UiCoreActionTypes.CoreOpenDialogAction, data: {
            type: 'alert',
            title: 'Error!', titleColor: '#ffffff', titleBackgroundColor: '#d32f2f',
            mensagem: 'O Medtime não reconhece este usuário ou senha. Por favor tente novamente com seu usuário e senha.',
            label: 'Ok, entendi!'
          }});
        }
      }
    }));

    this.subscription.add(this.list<%=component %>Done$.subscribe(response => {
      if (response != null) {
        this.ui.dispatch({type: UiCoreActionTypes.FinishIndeterminatedLoadingAction, element: '?-list-grid'});
      }
    }));
  }

  handlerSearchForm(f: NgForm): void {
    if (f.valid) {
      this.ui.dispatch({type: UiCoreActionTypes.StartIndeterminatedLoadingAction, element: '?-list-grid'});
      this.business.dispatch({type: <%=component %>ActionTypes.List<%=component %>Action, data: f});
    }
  }

  /**
   * Ao destruir o componente. realizar o ngOnDestroy dos Observables e realizar o detach
   * dos event handlers para reduzir o consumo de memória.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
