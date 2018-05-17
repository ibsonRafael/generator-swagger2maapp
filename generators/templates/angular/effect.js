/**
 * @class <%= tag %>Effects
 *
 * @author <%=author %> <<%=email %>>
 * @copyright MedTime - 2017 copyright
 */
import { Injectable }       from '@angular/core';
import { Effect, Actions }  from '@ngrx/effects';
import { Action }           from '@ngrx/store';
import { Observable }       from 'rxjs/Observable';
import { of }               from 'rxjs/observable/of';
import { Store }            from '@ngrx/store';

import {????????ActionTypes} from '../do-not-know';

import * as actions         from '../actions/<%=action_filename.replace('.ts', '') %>';
import * as store           from '../index';

<% for (definition in definitions) { %>
import { <%=definitions[definition]['baseName']%> }<%=('                 ').slice(definitions[definition]['baseName'].length)%>from '../../entities/models';<% } %>

import { <%=tag%>ApiClient } from '../../../auth/authApiClient.service'; // ISSO_EH_O_SERVICE_OU_COMMAND_CLASS
import * as business from '../do-not-know'; // Module created to this sub-context

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class <%= tag %>Effects {
    <%
    for (path in paths) {
        for(method in paths[path]) {
            if (tag == paths[path][method].tags[0]) {
    %>
    /**
     * @type {Observable<{type: ActionTypes.<%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>; payload: any} | any>}
     */
    @Effect()
    $<%=paths[path][method].operationId.charAt(0).toLowerCase() + paths[path][method].operationId.slice(1) %> = this.actions$.ofType(actions.ActionTypes.<%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>)
        .map((action: actions.<%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>Action) => action.payload)
        .switchMap(state => {
            // Do something here if needed...
            return this.<%=tag.charAt(0).toLowerCase() + tag.slice(1) %>ApiClient.<%=paths[path][method].operationId.charAt(0).toLowerCase() + paths[path][method].operationId.slice(1) %>(state)
                .map( response => {
<%
if (
    typeof(paths[path][method]['responses']['200']) != 'undefined'
    && typeof(paths[path][method]['responses']['200']['schema']) != 'undefined'
    && typeof(paths[path][method]['responses']['200']['schema']['type']) != 'undefined'
) {
-%>
<%if(paths[path][method]['responses']['200']['schema']['type'] == 'array') {-%>
                    // Se o tipo de retorno for array...
                    //const payload: Array<TYPE> = new User(response);
                    const payload: Array<TYPE> = [];
                    for(let item in response) {
                        payload.push(new User(item));
                    }
<%}else if(paths[path][method]['responses']['200']['schema']['type'] == '?') {-%>
                    // Se o tipo de retorno for ?...
<%}else{-%>
                    // Se o tipo de retorno for objeto...
                    const payload = new User(response);
<%}-%>
<%}-%>
                    return new actions.<%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>SuccessAction(payload);
                } )
                .catch( error => of( new actions.<%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>FailAction(error) ) );
        });
    <%
            }
        }
    }
    %>


    /**
     * @constructor
     */
    constructor (
        private actions$: Actions,
        private <%=tag.charAt(0).toLowerCase() + tag.slice(1) %>ApiClient: <%=tag%>ApiClient
    ) {
        // Silence is golden...
    }
}