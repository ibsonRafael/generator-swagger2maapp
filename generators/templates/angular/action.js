/**
 * @author <%=author %> <<%=email %>>
 * @copyright ???? - 2017 copyright
 */
import { Action }    from '@ngrx/store';
import {type}        from '../../../shared/utility/utility-helpers';
import {environment} from '../../../../environments/environment';

export const ActionTypes = {
    <%
for (path in paths) {
    for(method in paths[path]) {
        if (tag == paths[path][method].tags[0]) {
        %>
        <%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>:            type('[<%=tag %>] <%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return " " + y}) %>'),
        <%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>_SUCCESS:    type('[<%=tag %>] <%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return " " + y}) %> Success'),
        <%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>_FAIL:       type('[<%=tag %>] <%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return " " + y}) %> Fail'),
        <%
        }
    }
}
%>
};

<%
for (path in paths) {
    for(method in paths[path]) {
        if (tag == paths[path][method].tags[0]) {
        %>
            /**
             * @class <%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>Action
             * @implements Action
             */
        export class <%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>Action implements Action {
                type = ActionTypes.<%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>;

                /**
                 * @constructor
                 * @param payload {type}
                 */
                constructor(public payload: any = null) { }
            }

            /**
             * @class <%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>SuccessAction
             * @implements Action
             */
        export class <%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>SuccessAction implements Action {
                type = ActionTypes.<%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>_SUCCESS;

                /**
                 * @constructor
                 * @param payload {type}
                 */
                constructor(public payload: any = null) { }
            }


            /**
             * @class <%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>FailAction
             * @implements Action
             */
        export class <%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>FailAction implements Action {
                type = ActionTypes.<%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>_FAIL;

                /**
                 * @constructor
                 * @param payload {type}
                 */
                constructor(public payload: any = null) { }
            }
        <%
        }
    }
}
%>



export type Actions = <%
is_first = 0;
for (path in paths) {
    for(method in paths[path]) {
        if (tag == paths[path][method].tags[0]) { %><% if (++is_first > 1) {%>
        | <%} %><%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>Action
        | <%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>SuccessAction
        | <%=paths[path][method].operationId.charAt(0).toUpperCase() + paths[path][method].operationId.slice(1) %>FailAction<%
        }
    }
}
%>;
