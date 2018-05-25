/**
 * @class <%= tag %>Effects
 *
 * @author <%=author %> <<%=email %>>
 * @copyright ???? - 2017 copyright
 */
import * as actions         from '../actions/<%=action_filename.replace('.ts', '') %>';
<% for (definition in definitions) { -%>
import { <%=definitions[definition]['baseName']%> }<%=('                 ').slice(definitions[definition]['baseName'].length)%>from '../../entities/models';
<% } -%>

/**
 * @interface
 */
export interface State {
    loading: boolean;
    loaded:  boolean;
    created: boolean;
    updated: boolean;
    deleted: boolean;
    patched: boolean;
    failed:  boolean;
    data:    any;
};

const <%=tag.toUpperCase()%>_INITIAL_STATE: State = {
    loading: false,
    loaded:  false,
    created: false,
    updated: false,
    deleted: false,
    patched: false,
    failed:  false,
    data:    null
};

/**
 * @function reducer
 * @param state
 */
export function reducer(state = <%=tag.toUpperCase()%>_INITIAL_STATE, action: actions.Actions): State
{
    if (!action) return state;
    switch (action.type) {
<%
for (path in paths) {
    for(method in paths[path]) {
        if (tag == paths[path][method].tags[0]) {
-%>
        case actions.ActionTypes.<%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>: {
            return Object.assign({}, state, {
                loading: true,
                loaded:  false,
                created: false,
                updated: false,
                deleted: false,
                patched: false,
                failed:  false
            });
        }

        case actions.ActionTypes.<%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                loaded:  true,
                <%
                if (method.toLowerCase() == 'post') { -%>
                created: true,
                updated: false,
                deleted: false,
                patched: false,<%
                } else if(method.toLowerCase() == 'patch') {-%>
                created: false,
                updated: false,
                deleted: false,
                patched: true,<%
                } else if(method.toLowerCase() == 'put') {-%>
                created: false,
                updated: true,
                deleted: false,
                patched: false,<%
                } else if(method.toLowerCase() == 'get') {-%>
                created: false,
                updated: false,
                deleted: false,
                patched: false,<%
                } else if(method.toLowerCase() == 'delete') {-%>
                created: false,
                updated: false,
                deleted: true,
                patched: false,<%
                }
                %>
                failed:  false<%
                    if (
                        typeof(paths[path][method]['responses']['200']) != 'undefined'
                        && typeof(paths[path][method]['responses']['200']['schema']) != 'undefined'
                    ) { -%>,
                data:    action.payload
            <% } %>});
        }

        case actions.ActionTypes.<%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>_FAIL: {
            return Object.assign({}, <%=tag.toUpperCase()%>_INITIAL_STATE, { failed:  true });
        }

<%
        }
    }
}
-%>
        default: {
            return state;
        }
    }
}

export const getData    = (state: State) => state.data;
export const isLoading  = (state: State) => state.loading;
export const isLoaded   = (state: State) => state.loaded;
export const isFailed   = (state: State) => state.failed;