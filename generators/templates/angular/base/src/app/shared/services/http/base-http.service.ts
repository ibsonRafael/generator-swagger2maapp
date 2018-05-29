/**
 * @class LocationApiClientService
 *
 * @author Swagger API Team <apiteam@swagger.io>
 * @copyright ???? - 2017 copyright
 */
import { Injectable }  from '@angular/core';
import { Observable }  from "rxjs/Observable";
import { HttpClient, HttpResponse, HttpHeaders }  from '@angular/common/http';
// -------------------------------------- //
import { HttpAdapter }         from './http.adapter';
import { HttpResponseHandler } from './http-response-handler.service';
// -------------------------------------- //
@Injectable()
export class BaseHttpService {
  /**
   * @constructor
   * Construtor do serviço de acesso a api de Location
   */
  constructor(
    protected http: HttpClient,
    protected responseHandler: HttpResponseHandler
  ) {
    // Do nothing...
  }

  /**
   * Response Interceptor
   *
   * @method responseInterceptor
   * @param {Response} observableRes - response object
   * @param {Function} adapterFn
   * @returns {Response} res - transformed response object
   */
  protected responseInterceptor(observableRes: Observable<any>, adapterFn?: Function): Observable<any> {
    return observableRes
      .map(res => HttpAdapter.baseAdapter(res, adapterFn))
      .catch((err, source) => this.responseHandler.onCatch(err, source));
  }
}
