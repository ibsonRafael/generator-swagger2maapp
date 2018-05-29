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
    listaLoading: boolean;
    listaLoaded:  boolean;
    listaFailed:  boolean;
    lista:        Array<any>;

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
    listaLoading: false,
    listaLoaded:  false,
    listaFailed:  false,
    lista:        [],

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
export function reducer(state = <%=tag.toUpperCase() %>_INITIAL_STATE, action: actions.Actions): State
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
                failed:  false<% if (
                    typeof(paths[path][method]['responses']['200']) != 'undefined'
                    && typeof(paths[path][method]['responses']['200']['schema']) != 'undefined'
                    && typeof(paths[path][method]['responses']['200']['schema']['type']) != 'undefined'
                    && paths[path][method]['responses']['200']['schema']['type'].toLowerCase() == 'array'
                ) { -%>,
                listaLoading: true,
                listaLoaded:  false<% } else if (
                    typeof(paths[path][method]['responses']['200']) != 'undefined'
                    && typeof(paths[path][method]['responses']['200']['schema']) != 'undefined'
                    ) { -%>,
                loading: true,
                loaded:  false
            <% } %>});
        }

        case actions.ActionTypes.<%=paths[path][method].operationId.replace(/\.?([A-Z]+)/g, function (x, y) {return "_" + y.toLowerCase()}).toUpperCase() %>_SUCCESS: {
            return Object.assign({}, state, {
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
                        && typeof(paths[path][method]['responses']['200']['schema']['type']) != 'undefined'
                        && paths[path][method]['responses']['200']['schema']['type'].toLowerCase() == 'array'
                    ) { -%>,
                listaLoading: false,
                listaLoaded:  true,
                lista:    action.payload<% } else if (
                        typeof(paths[path][method]['responses']['200']) != 'undefined'
                        && typeof(paths[path][method]['responses']['200']['schema']) != 'undefined'
                        ) { -%>,
                loading: false,
                loaded:  true,
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
// @TODO Soment se houver retorno de lista/array em algum dos endpoints desta tag...
export const getListaData    = (state: State) => state.lista;
export const isListaLoading  = (state: State) => state.listaLoading;
export const isListaLoaded   = (state: State) => state.listaLoaded;
export const isListaFailed   = (state: State) => state.listaFailed;

export const getData    = (state: State) => state.data;
export const isLoading  = (state: State) => state.loading;
export const isLoaded   = (state: State) => state.loaded;
export const isCreated  = (state: State) => state.created;
export const isUpdated  = (state: State) => state.updated;
export const isDeleted  = (state: State) => state.deleted;
export const isPatched  = (state: State) => state.patched;
export const isFailed   = (state: State) => state.failed;