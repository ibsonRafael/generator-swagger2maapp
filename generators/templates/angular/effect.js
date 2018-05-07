/**
 * @class <%= classname %>HandlerEffects
 *
 * @author <%=author %> <<%=email %>>
 * @copyright MedTime - 2017 copyright
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';

import {<%= subcontext %>ActionTypes} from '../do-not-know';

import * as business from '../do-not-know'; // Module created to this sub-context

@Injectable()
export class <%= classname %>HandlerEffects {
    /**
     * @type {Observable<{type: <%= subcontext %>ActionTypes; error: any} | any>}
     */
    @Effect()
    $actions<%= classname %> = this.actions$.ofType(<%=subcontext %>ActionTypes.<%= action %>Action)
        .pluck('data')
        .switchMap(data => this.handler(data))
        .map(data => ({type: <%=subcontext %>ActionTypes.<%= action %>DoneAction, data: data}))
        .catch(error => Observable.of({type: <%=subcontext %>ActionTypes.<%= action %>ErrorAction, error}));

    /**
     * @constructor
     */
    constructor (private actions$: Actions)
    {
        // Silence is golden...
    }

    /**
     * @TODO Deveríamos usar tipo para esse contexto?!
     *  ex.: private handler(data: XablauDto): Observable<any> {
     */
    private handler(data): Observable<any> {
        // Make your modifications here
        const command = new business.<%=command %>Command(data);
        return command.execute();
    }
}