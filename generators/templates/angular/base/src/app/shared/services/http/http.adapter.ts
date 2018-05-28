import { Response } from '@angular/http';

export class HttpAdapter {

  static baseAdapter(res: Response, adapterFn?: Function): any {
    if (res.status === 200) {
      try {
        const json = res.json();
        const jsonRes = json.Data;
        return adapterFn ? adapterFn.call(undefined, jsonRes) : jsonRes;
      } catch (e) {
        return res;
      }
    }
  }
}
