import { Injectable }           from '@angular/core';
import { Router }               from '@angular/router';
import { Observable }           from 'rxjs/Observable';

@Injectable()
export class HttpResponseHandler {
  constructor(
    private router: Router
  ) {}

  /**
   * Realiza o tratamento global dos erros http/status code retornados pelo backed/api
   *
   * @param { Response | any } error
   * @param { Observable<any> } source
   * @returns {ErrorObservable}
   */
  public onCatch(response: any, source: Observable<any>): Observable<any> {
    switch (response.status) {
      case 400:
        this.handleBadRequest(response);
        break;

      case 401:
        this.handleUnauthorized(response);
        break;

      case 403:
        this.handleForbidden();
        break;

      case 404:
        this.handleNotFound(response);
        break;

      case 500:
        this.handleServerError();
        break;

      default:
        break;
    }

    return Observable.throw(response);
  }

  /**
   * Mostra erros de notificação quando o status de resposta do servidor é 401
   *
   * @param error
   */
  private handleBadRequest(responseBody: any): void {
    if (responseBody._body) {
      try {
        const bodyParsed = responseBody.json();
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
        this.handleServerError();
      }
    } else {
      this.handleServerError();
    }
  }

  /**
   * Mostra erros de notificação quando o status de resposta do servidor é 401 e redireciona o usuário para a página de login
   *
   * @param responseBody
   */
  private handleUnauthorized(responseBody: any): void {
    // Read configuration in order to see if we need to display 401 notification message
    // let unauthorizedEndpoints: Array<string> = this.configService.get('notifications').unauthorizedEndpoints;

    // unauthorizedEndpoints = unauthorizedEndpoints.filter(endpoint => this.getRelativeUrl(responseBody.url) === endpoint);
    // this.router.navigate(['/login']);

    // if (unauthorizedEndpoints.length) {
    //   this.notificationsService.info('Info', this.translateService.instant('ServerError401'), this.configService.get('notifications').options);
    // }
    alert('Unauthorized!');
  }

  /**
   * Mostra erros de notificação quando o status de resposta do servidor é 403
   */
  private handleForbidden(): void {
    // this.notificationsService.error('error', this.translateService.instant('ServerError403'), this.configService.get('notifications').options);
    // this.router.navigate(['/login']);
    alert('Forbiden');
  }

  /**
   * Mostra erros de notificação quando o status de resposta do servidor é 404
   *
   * @param responseBody
   */
  private handleNotFound(responseBody: any): void {
    // Read configuration in order to see if we need to display 401 notification message
    // let notFoundEndpoints: Array<string> = this.configService.get('notifications').notFoundEndpoints;
    // notFoundEndpoints = notFoundEndpoints.filter(endpoint => this.getRelativeUrl(responseBody.url) === endpoint);

    // if (notFoundEndpoints.length) {
    //   let message = this.translateService.instant('ServerError404'),
    //     title   = this.translateService.instant('ErrorNotificationTitle');
    //
    //   this.showNotificationError(title, message);
    // }
    alert('Not found');
  }

  /**
   * Mostra erros de notificação quando o status de resposta do servidor é 500
   */
  private handleServerError(): void {
    // const message = this.translateService.instant('ServerError500'),
    //       title   = this.translateService.instant('ErrorNotificationTitle');

    // this.showNotificationError(title, message);
    alert('Server error');
  }

  /**
   * Analisa a resposta do servidor e mostra erros de notificação com mensagens traduzidas
   *
   * @param response
   */
  private handleErrorMessages(response: any): void {
    if (!response) {
      return;
    }

    // for (const key of Object.keys(response)) {
    //   if (Array.isArray(response[key])) {
    //     response[key].forEach((value) => this.showNotificationError('Error', this.getTranslatedValue(value)));
    //   }
    //   else this.showNotificationError('Error', this.getTranslatedValue(response[key]));
    // }
    alert('Error!');
  }

  /**
   * Extrai e retorna o valor traduzido da resposta do servidor
   *
   * @param value
   * @returns {string}
   */
  private getTranslatedValue(value: string): string {
    if (value.indexOf('[') > -1) {
      const key = value.substring(value.lastIndexOf("[")+1,value.lastIndexOf("]"));
      // value = this.translateService.instant(key);
      value = '??? ?? ?';
    }
    return value;
  }

  /**
   * Retorna o URL relativo do caminho absoluto
   *
   * @param responseBody
   * @returns {string}
   */
  private getRelativeUrl(url: string): string {
    return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, "");
  }

  /**
   * Mostra a notificação de erro com um determinado título e mensagem
   *
   * @param title
   * @param message
   */
  private showNotificationError(title: string, message: string): void {
    //this.notificationsService.error(title, message, this.configService.get('notifications').options);
    alert(message);
  }
}
