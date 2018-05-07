/**
 * @class <%= actioname %>
 *
 * @author <%=author %> <<%=email %>>
 * @copyright MedTime - 2017 copyright
 */
import { Action } from '@ngrx/store';
import {<%= subcontext %>ActionTypes} from '../do-not-know';

/**
 * @class
 */
export class <%= actioname %> implements Action {
    readonly type = <%= subcontext %>ActionTypes.<%= actioname %>Action;
    // @TODO Colocar os tipos de entrada para os commandos...
}
export type <%= actioname %>Actions = <%= actioname %>;