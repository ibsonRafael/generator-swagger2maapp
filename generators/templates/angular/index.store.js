/**
 * @class <%= tag %>Effects
 *
 * @author <%=author %> <<%=email %>>
 * @copyright ???? - 2017 copyright
 */
<%
var nomeFirstLower = tag;
nomeFirstLower = nomeFirstLower.charAt(0).toLowerCase() + nomeFirstLower.slice(1);
nomeFirstUpper = nomeFirstLower.charAt(0).toUpperCase() + nomeFirstLower.slice(1);

var array_tags = [];
var array_tags_lower = [];
var array_tags_upper = [];
var array_tags_snake = [];
for (path in paths) {
    for (method in paths[path]) {
        if (array_tags.indexOf(paths[path][method].tags[0]) == -1) {
            array_tags.push(paths[path][method].tags[0]);
            var current_tag = paths[path][method].tags[0];
            current_tag = current_tag.charAt(0).toLowerCase() + current_tag.slice(1);
            array_tags_lower.push(current_tag);

            var current_tag_upper = current_tag.charAt(0).toUpperCase() + current_tag.slice(1);
            array_tags_upper.push(current_tag_upper);

            var current_tag_snake = current_tag.replace(/\.?([A-Z]+)/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^-/, "");
            array_tags_snake.push(current_tag_snake.toLowerCase());
        }
    }
}
-%>
import { createSelector } from 'reselect';

// Mais informações em:  https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
import { ActionReducer, combineReducers } from '@ngrx/store';

// Mais informações em: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
import { compose } from '@ngrx/core/compose';
<% for (_tag in array_tags_lower) { %>
import * as from<%=array_tags_upper[_tag]%> from './reducers/<%=array_tags_snake[_tag].toLowerCase() %>.reducer';<% } -%>


/**
 * Tratamos cada reducer como uma tabela em um banco de dados. Isso significa
 * nossa interface de estado de nível superior é apenas um mapa de chaves para
 * os tipos de estado interno.
 */
export interface State {
<% for (_tag in array_tags_lower) { %>
    <%=array_tags_lower[_tag]%>: from<%=array_tags_upper[_tag]%>.State;<% } %>
}


/**
 * Como os metareducers tomam uma função do reducer e retornam um novo reducer,
 * podemos usar nosso auxiliar de composição para encaderná-los juntos. Aqui estamos
 * usando o combineReducers para tornar nosso reducer de nível superior e
 * envolvendo ele no storeLogger. Lembre-se que compor aplica o resultado da
 * direita para a esquerda.
 */
const reducers = {
<% for (_tag in array_tags_lower) { %>
    <%=array_tags_lower[_tag]%>: from<%=array_tags_upper[_tag]%>.reducer, <% } %>
};


export function store(state: any, action: any) {
    const store: ActionReducer<State> = compose(combineReducers)(reducers);
    return store(state, action);
}

/**
 * Cada módulo redurcer exporta funções seletoras, no entanto os reducers filhos
 * não tem conhecimento da árvore de estado geral. Para torná-los utilizáveis, nós
 * precisa fazer novos seletores que os envolvam.
 */


<% for (_tag in array_tags_lower) { %>
/**
 * Configurações das funções de <%=array_tags_upper[_tag]%>
 */
export const get<%=array_tags_upper[_tag]%>State  = (state: State) => state.<%=nomeFirstLower%>;
export const get<%=array_tags_upper[_tag]%>Data   = createSelector(get<%=array_tags_upper[_tag]%>State, from<%=array_tags_upper[_tag]%>.getData);
export const is<%=array_tags_upper[_tag]%>Loading = createSelector(get<%=array_tags_upper[_tag]%>State, from<%=array_tags_upper[_tag]%>.isLoading);
export const is<%=array_tags_upper[_tag]%>Loaded  = createSelector(get<%=array_tags_upper[_tag]%>State, from<%=array_tags_upper[_tag]%>.isLoaded);
export const is<%=array_tags_upper[_tag]%>Created = createSelector(get<%=array_tags_upper[_tag]%>State, from<%=array_tags_upper[_tag]%>.isCreated);
export const is<%=array_tags_upper[_tag]%>Updated = createSelector(get<%=array_tags_upper[_tag]%>State, from<%=array_tags_upper[_tag]%>.isUpdated);
export const is<%=array_tags_upper[_tag]%>Patched = createSelector(get<%=array_tags_upper[_tag]%>State, from<%=array_tags_upper[_tag]%>.isPatched);
export const is<%=array_tags_upper[_tag]%>Deleted = createSelector(get<%=array_tags_upper[_tag]%>State, from<%=array_tags_upper[_tag]%>.isDeleted);
export const is<%=array_tags_upper[_tag]%>Failed  = createSelector(get<%=array_tags_upper[_tag]%>State, from<%=array_tags_upper[_tag]%>.isFailed);

<% } %>