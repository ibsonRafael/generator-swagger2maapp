/**
 * @class <%= tag %>ApiClientService
 *
 * @author <%=author %> <<%=email %>>
 * @copyright ???? - 2017 copyright
 */
import { Injectable }  from '@angular/core';
import { Observable }  from "rxjs/Observable";
import { environment}  from '../../../../environments/environment';
import { HttpClient, HttpResponse }  from 'angular/common/http';
// -------------------------------------- //
import { HttpAdapter } from './../../../shared/services/http/http.adapter';
import { HttpResponseHandler } from './../../../shared/services/http/http-response-handler.service';
import { * } from './../../../shared/services/http/http-options-global';
// -------------------------------------- //

@Injectable()
export class <%= tag %>ApiClientService {

    /**
     * Realiza a mesclagem dos headers globais com os headers especificos do
     * serviço se houver algum
     * @type {{headers: HttpHeaders}}
     */
    const httpOptions = {
        headers: new HttpHeaders(Object.asign(
            {},
            httpOptionsGlobal,
            {
                'Content-Type':  'application/json',
                'Authorization': 'my-auth-token'
            }
        ))
    };

    /**
     * @constructor
     * Construtor do serviço de acesso a api de <%= tag %>
     */
    constructor(
        protected http: HttpClient,
        protected responseHandler: HttpResponseHandler
    ) {
        // Do nothing...
    }

    <%
    for (path in paths) {
        for(method in paths[path]) {
            if (tag == paths[path][method].tags[0]) {
    %>
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
     * @param <%=paths[path][method]['parameters'][param].name %> {<%=paths[path][method]['parameters'][param].type + ' | '  %><%=paths[path][method]['parameters'][param].baseName + ' | ' %>any} [DENTRO DO OBJETO DATA] <%=paths[path][method]['parameters'][param].description %>
<% } -%><% } -%>
     * @returns {Observable<any>}
     * @TODO Tipar os retornos e também o type do metódo de requisição...
     */
    public <%=paths[path][method].operationId.charAt(0).toLowerCase() + paths[path][method].operationId.slice(1) %>(<%
    if (
        typeof(paths[path][method]['parameters']) != 'undefined'
        && paths[path][method]['parameters'].length > 0
    ) {
        var _parametros = '';
        if (method == 'patch' || method == 'post' || method == 'put') {
            _parametros = ', data';
        }
        -%>data: any<% } -%>): Observable<HttpResponse<any>> {
        if (!environment.production) {
            console.log('<%= tag %>ApiClientService::<%=paths[path][method].operationId.charAt(0).toLowerCase() + paths[path][method].operationId.slice(1) %>', data);
        }
        <%
            var _tipo_retorno = 'any';
            var _tem_param_url = path.indexOf("{") > -1;
            var _url = api.basePath + path;
                _url = _url.split('{').join('${_');
        %>
<% if (!_tem_param_url) { -%>
        let endpoint: string = environment.BASE_URL +  '<%=api.basePath %><%=path %>';
        <% } else { -%>
<%
        if (
            typeof(paths[path][method]['parameters']) != 'undefined'
            && paths[path][method]['parameters'].length > 0
        ) {
            var hasParamInQuery = false;
            for(_param in paths[path][method]['parameters']) {
                if (
                    paths[path][method]['parameters'][_param].in != 'path'
                    && paths[path][method]['parameters'][_param].in != 'query'
                ) {
                    continue;
                }

                if (paths[path][method]['parameters'][_param].in == 'query') {
                    _url = _url + (hasParamInQuery ? '&' : '?');
                    _url = _url + paths[path][method]['parameters'][_param].name + '=${' + paths[path][method]['parameters'][_param].name + '}';
                    hasParamInQuery = true;
                }
        -%>
        const _<%=paths[path][method]['parameters'][_param].name %>: <%=paths[path][method]['parameters'][_param].type %> = data.<%=paths[path][method]['parameters'][_param].name %>;
        <%
            }
        }
        %>
        let endpoint: string = `${environment.BASE_URL}<%=_url%>`;
        <% } %>
        let observable: Observable<any> = this.http.<%=method%><<%=_tipo_retorno%>>(endpoint<%=_parametros %>, this.httpOptions);
        observable = this.responseInterceptor(observable);
        return observable;
    }
    <%
            }
        }
    }
    %>

    /**
     * Response Interceptor
     *
     * @method responseInterceptor
     * @param {Response} observableRes - response object
     * @returns {Response} res - transformed response object
     */
    protected responseInterceptor(observableRes: Observable<any>, adapterFn?: Function): Observable<any> {
        return observableRes
            .map(res => HttpAdapter.baseAdapter(res, adapterFn))
            .catch((err, source) => this.responseHandler.onCatch(err, source));
    }
}