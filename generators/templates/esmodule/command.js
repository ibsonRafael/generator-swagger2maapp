'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpClientBase = exports.<%= comandName %> = undefined;


var _stringify = require('babel-runtime/core-js/json/stringify');
var _stringify2 = _interopRequireDefault(_stringify);

var _Rx = require('rxjs/Rx');
var Rx = _interopRequireWildcard(_Rx);


class HttpClientBase {
}
exports.HttpClientBase = HttpClientBase;



class <%= comandName %> extends HttpClientBase {
    // @TODO
    /**
     * @constructor
     */
    constructor (data) {
        this._data = data;
    }

    execute (data) {
        return this._<%=operation %>(data);
    }

    _<%=operation %> () {

    }
}
exports.<%= comandName %> = <%= comandName %>;
<%= comandName %>.prototype._data = null;