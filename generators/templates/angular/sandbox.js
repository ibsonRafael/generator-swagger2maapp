/**
 * @class <%= tag %>SandboxService
 *
 * @author <%=author %> <<%=email %>>
 * @copyright ???? - 2017 copyright
 */
import { Injectable } from '@angular/core';
// -------------------------------------- //
import { Store }      from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
// -------------------------------------- //
import * as store     from './store/';
import * as actions   from './store/actions/<%=tag.toLowerCase() %>.action';

@Injectable()
export class <%=tag %>SandboxService {

    private subscriptions: Array<Subscription> = [];

<%
var array_atributes = [];
for (path in paths) {
    for (method in paths[path]) {
        if (tag == paths[path][method].tags[0]) {
-%>
<%
        if (
            typeof(paths[path][method]['responses']['200']) != 'undefined'
            && typeof(paths[path][method]['responses']['200']['schema']) != 'undefined'
            && typeof(paths[path][method]['responses']['200']['schema']['type']) != 'undefined'
        ) {
-%>
<% if (paths[path][method]['responses']['200']['schema']['type'] == 'array') {-%>
<%
  var nomeUpper = paths[path][method]['responses']['200']['schema']['items'].baseName;
  nomeUpper = nomeUpper.charAt(0).toUpperCase() + nomeUpper.slice(1) + 'Lista';

  var nomeLower = nomeUpper.charAt(0).toLowerCase() + nomeUpper.slice(1);
  if(array_atributes.indexOf(nomeLower) == -1) {
  array_atributes.push(nomeLower);
-%>
    public <%=nomeLower%>$        = this.state.select(store.get<%=nomeUpper%>);
    public is<%=nomeUpper%>Loading$ = this.state.select(store.is<%=nomeUpper%>Loading);
    public is<%=nomeUpper%>Loaded$  = this.state.select(store.is<%=nomeUpper%>Loaded);
    public is<%=nomeUpper%>Failed$  = this.state.select(store.is<%=nomeUpper%>Failed);

<% } } else {-%>
<%
    var nomeUpper = paths[path][method]['responses']['200']['schema'].baseName;
    nomeUpper = nomeUpper.charAt(0).toUpperCase() + nomeUpper.slice(1);

    var nomeLower = nomeUpper.charAt(0).toLowerCase() + nomeUpper.slice(1);
    if(array_atributes.indexOf(nomeLower) == -1) {
    array_atributes.push(nomeLower);
-%>
    public <%=nomeLower%>$        = this.state.select(store.get<%=nomeUpper%>);
    public is<%=nomeUpper%>Loading$ = this.state.select(store.is<%=nomeUpper%>Loading);
    public is<%=nomeUpper%>Loaded$  = this.state.select(store.is<%=nomeUpper%>Loaded);
    public is<%=nomeUpper%>Failed$  = this.state.select(store.is<%=nomeUpper%>Failed);

<% } } -%>
<%      } -%>
<%
        }
    }
}
-%>

    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * @TODO Tratar os get, post, deletes, updates and patches... Ver nos reducers
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Inicializa o sandbox do módulo, define valores padrão de atributos e executa rotinas internas
     * @constructor
     * @param state {Store<State>} Recebe um objeto instância de **Store<State>**.
     */
    constructor(
        protected state: Store<store.State>
    ) {
        this.registerEvents();
    }

<%
    for (path in paths) {
        for(method in paths[path]) {
            if (tag == paths[path][method].tags[0]) {
-%>
    /**<% if(
     typeof(paths[path][method]['summary']) != 'undefined' && paths[path][method]['summary'].length > 0
     ) { -%><%="\n     * " + paths[path][method]['summary'].split("\n").join("\n     * ") %>
     *<% } -%><% if(
     typeof(paths[path][method]['description']) != 'undefined' && paths[path][method]['description'].length > 0
     ) { -%><%="\n     * " + paths[path][method]['description'].split("\n").join("\n     * ") %>
<% } -%>
<% if(
     typeof(paths[path][method]['parameters']) != 'undefined' && paths[path][method]['parameters'].length > 0
     ) { -%><% for (param in paths[path][method]['parameters']) { -%>
     * @param <%=param.name %> {<%=param.type %> | any} <%=param.description %>
<% } -%><% } -%>
     *
     * @TODO Automatcaly generate param name based on parameters?
     */
    public <%=paths[path][method].operationId.charAt(0).toLowerCase() + paths[path][method].operationId.slice(1) %>(<% if(
            typeof(paths[path][method]['parameters']) != 'undefined' && paths[path][method]['parameters'].length > 0
        ) { -%> data: any <% } -%>): void {
        this.state.dispatch(new actions.<%=paths[path][method].operationId.charAt(0).toLowerCase() + paths[path][method].operationId.slice(1) %>(<% if(
                    typeof(paths[path][method]['parameters']) != 'undefined' && paths[path][method]['parameters'].length > 0
                ) { -%> data <% } -%>));
    }

<%
            }
        }
    }
-%>

    /**
     * Unsubscribe dos itens subscritos com base no "**bag**" de subscrições.
     */
    public unregisterEvents(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    /**
     * Subscriscreve a alguns observables colocando-os em um "**bag**" de subscrições.
     */
    private registerEvents(): void {
        /*
         * Exemplo:
         *this.subscriptions.push(
         *   this.periodos$.subscribe(
         *       res => { console.log('this.periodos$.subscribe', res); },
         *       err => { console.error('this.periodos$.subscribe', err); }
         *   )
         *);
         */
    }